using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace CaspianEra.Infratructure.Files;

public class CloudinaryStorageService : IFileStorageService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryStorageService(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task DeleteAsync(string? fileUrl, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
            return;

        var uri = new Uri(fileUrl);

        var path = uri.AbsolutePath;

        var uploadIndex = path.IndexOf("/upload/", StringComparison.OrdinalIgnoreCase);

        if (uploadIndex == -1)
            throw new InvalidOperationException("Invalid Cloudinary URL.");

        var publicId = path[(uploadIndex + "/upload/".Length)..];

        var parts = publicId.Split("/");

        if(parts.Length > 0 && parts[0].StartsWith("v") && parts[1].Skip(1).All(char.IsDigit))
        {
            publicId = string.Join("/", parts.Skip(1));
        }

        var resourceType = fileUrl.Contains("/video/upload/")
                ? ResourceType.Video
                : ResourceType.Image;

        publicId = Path.ChangeExtension(publicId, null);

        var deleteParams = new DeletionParams(publicId)
        {
            ResourceType = resourceType
        };

        var result = await _cloudinary.DestroyAsync(deleteParams);

        if (result.Result != "ok" &&
            result.Result != "not found")
        {
            throw new InvalidOperationException(
                $"Cloudinary delete failed: {result.Result}");
        }
    }

    public async Task<string> SaveImageAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        if (file is null || file.Length == 0)
            throw new ArgumentNullException(nameof(file));

        await using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "CaspianEra/images"
        };

        var result = await _cloudinary.UploadAsync(uploadParams, cancellationToken);

        if (result.Error is not null)
        {
            throw new InvalidOperationException(
                result.Error.Message
            );
        }

        return result.SecureUrl.ToString();
    }

    public async Task<string> SaveVideoAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        if (file is null || file.Length == 0)
            throw new ArgumentException("Video file is empty.");

        await using var stream = file.OpenReadStream();

        var uploadParams = new VideoUploadParams
        {
            File = new FileDescription(
                file.FileName,
                stream
            ),

            Folder = "CaspianEra/videos"
        };

        var result = await _cloudinary.UploadAsync(
            uploadParams,
            cancellationToken
        );

        if (result.Error is not null)
            throw new InvalidOperationException(
                result.Error.Message
            );

        return result.SecureUrl.ToString();
    }
}

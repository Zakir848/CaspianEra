import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  Search,
  LocationOnOutlined,
  CalendarMonthOutlined,
  PeopleOutlined,
  ArrowForward,
  VerifiedOutlined,
  SupportAgentOutlined,
  HotelOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
// import { getCities } from "../services/cityService";
import { getHotels } from "../features/hotels/api/hotelsApi";
// import HotelCard from "../components/HotelCard";

export default function HomePage() {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError("");

        const [citiesData, hotelsData] = await Promise.all([
          getCities(),
          getHotels(),
        ]);

        setCities(citiesData);
        setHotels(hotelsData);
      } catch (err) {
        console.error("Failed to load home data:", err);
        setError("Məlumatları yükləmək mümkün olmadı.");
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.city) {
      params.set("city", search.city);
    }

    if (search.checkIn) {
      params.set("checkIn", search.checkIn);
    }

    if (search.checkOut) {
      params.set("checkOut", search.checkOut);
    }

    params.set("guests", search.guests);

    navigate(`/hotels?${params.toString()}`);
  };

  const features = [
    {
      icon: <VerifiedOutlined sx={{ fontSize: 30 }} />,
      title: "Seçilmiş otellər",
      description:
        "Azərbaycanın müxtəlif şəhərlərində yerləşən otelləri kəşf edin.",
    },
    {
      icon: <HotelOutlined sx={{ fontSize: 30 }} />,
      title: "Rahat rezervasiya",
      description:
        "Otelləri müqayisə edin və sizə uyğun otağı seçin.",
    },
    {
      icon: <SupportAgentOutlined sx={{ fontSize: 30 }} />,
      title: "Rahat istifadə",
      description:
        "Axtarışdan rezervasiyaya qədər sadə və aydın interfeys.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Hero section */}
      <Box
        sx={{
          position: "relative",
          minHeight: {
            xs: 650,
            md: 680,
          },
          display: "flex",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(90deg, rgba(8,26,44,0.88) 0%, rgba(8,26,44,0.52) 55%, rgba(8,26,44,0.2) 100%), url('/images/baku-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#FFFFFF",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            py: {
              xs: 8,
              md: 12,
            },
          }}
        >
          <Box
            sx={{
              maxWidth: 760,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  md: 15,
                },
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#D9B77A",
                mb: 2,
              }}
            >
              CASPIANERA • AZƏRBAYCAN
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: 39,
                  sm: 54,
                  md: 70,
                },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                mb: 3,
              }}
            >
              Növbəti səyahətin
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: "#E7C58B",
                }}
              >
                buradan başlayır.
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 560,
                fontSize: {
                  xs: 15,
                  md: 18,
                },
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.86)",
                mb: 5,
              }}
            >
              Bakının müasir otellərindən Azərbaycanın təbiət
              qoynundakı istirahət məkanlarına qədər sizə uyğun
              seçimi CaspianEra ilə kəşf edin.
            </Typography>
          </Box>

          {/* Search panel */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 1120,
              bgcolor: "#FFFFFF",
              borderRadius: 3,
              p: {
                xs: 2,
                md: 2.5,
              },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "2fr 1.4fr 1.4fr 1fr auto",
              },
              gap: 1.5,
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
            }}
          >
            <TextField
              label="Şəhər və ya otel"
              placeholder="Hara səyahət edirsiniz?"
              value={search.city}
              onChange={(e) =>
                setSearch({
                  ...search,
                  city: e.target.value,
                })
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnOutlined />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#F8FAFC",
                },
              }}
            />

            <TextField
              label="Giriş tarixi"
              type="date"
              value={search.checkIn}
              onChange={(e) =>
                setSearch({
                  ...search,
                  checkIn: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthOutlined />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#F8FAFC",
                },
              }}
            />

            <TextField
              label="Çıxış tarixi"
              type="date"
              value={search.checkOut}
              onChange={(e) =>
                setSearch({
                  ...search,
                  checkOut: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#F8FAFC",
                },
              }}
            />

            <TextField
              label="Qonaq sayı"
              type="number"
              value={search.guests}
              onChange={(e) =>
                setSearch({
                  ...search,
                  guests: Math.max(1, Number(e.target.value)),
                })
              }
              slotProps={{
                htmlInput: {
                  min: 1,
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleOutlined />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#F8FAFC",
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{
                minHeight: 56,
                px: 3,
                borderRadius: 2,
                bgcolor: "#17324D",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",

                "&:hover": {
                  bgcolor: "#254D70",
                  boxShadow: "none",
                },
              }}
            >
              Axtar
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Cities section */}
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 7,
            md: 10,
          },
        }}
      >
        <Box
          sx={{
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#B28A50",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            İSTİQAMƏTLƏR
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: 28,
                md: 38,
              },
              fontWeight: 800,
              color: "#17324D",
              mb: 1,
            }}
          >
            Azərbaycanı kəşf edin
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              color: "#64748B",
            }}
          >
            Səyahət etmək istədiyiniz şəhəri seçin.
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 6,
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            {cities.slice(0, 4).map((city) => (
              <Box
                key={city.cityId}
                onClick={() =>
                  navigate(`/hotels?cityId=${city.cityId}`)
                }
                sx={{
                  position: "relative",
                  height: 320,
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  bgcolor: "#17324D",

                  "&:hover .city-image": {
                    transform: "scale(1.08)",
                  },

                  "&:hover .city-arrow": {
                    transform: "translateX(5px)",
                  },
                }}
              >
                <Box
                  component="img"
                  className="city-image"
                  src={
                    city.images?.[0] ||
                    "https://placehold.co/600x800?text=CaspianEra"
                  }
                  alt={city.cityName}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.78) 100%)",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 25,
                        fontWeight: 800,
                        color: "#FFFFFF",
                        mb: 0.5,
                      }}
                    >
                      {city.cityName}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.82)",
                      }}
                    >
                      {city.description || "Şəhəri kəşf edin"}
                    </Typography>
                  </Box>

                  <ArrowForward
                    className="city-arrow"
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 25,
                      flexShrink: 0,
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* Hotels section */}
      <Box
        sx={{
          bgcolor: "#F7F9FC",
          py: {
            xs: 7,
            md: 10,
          },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: {
                xs: "flex-start",
                sm: "flex-end",
              },
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              mb: 4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: "#B28A50",
                  mb: 1,
                }}
              >
                OTELLƏR
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontSize: {
                    xs: 28,
                    md: 38,
                  },
                  fontWeight: 800,
                  color: "#17324D",
                  mb: 1,
                }}
              >
                Sizin üçün otellər
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "#64748B",
                }}
              >
                Növbəti istirahətiniz üçün seçimlərə baxın.
              </Typography>
            </Box>

            <Button
              endIcon={<ArrowForward />}
              onClick={() => navigate("/hotels")}
              sx={{
                color: "#17324D",
                fontSize: 14,
                fontWeight: 700,
                textTransform: "none",
                px: 0,

                "&:hover": {
                  bgcolor: "transparent",
                  color: "#B28A50",
                },
              }}
            >
              Bütün otellər
            </Button>
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 6,
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                },
                gap: 3,
              }}
            >
              {hotels.slice(0, 6).map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Features section */}
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 7,
            md: 10,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: 28,
                md: 38,
              },
              fontWeight: 800,
              color: "#17324D",
              mb: 1,
            }}
          >
            Niyə CaspianEra?
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              color: "#64748B",
            }}
          >
            Səyahətinizi planlamaq üçün rahat platforma.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {features.map((feature) => (
            <Box
              key={feature.title}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "#FFFFFF",
                border: "1px solid #E8EDF2",
                textAlign: "center",
                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.07)",
                },
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: 3,
                  bgcolor: "#EDF3F8",
                  color: "#17324D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2.5,
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: "#17324D",
                  mb: 1,
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "#64748B",
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Call to action */}
      <Box
        sx={{
          bgcolor: "#17324D",
          py: {
            xs: 7,
            md: 9,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 28,
                  md: 38,
                },
                fontWeight: 800,
                color: "#FFFFFF",
                mb: 1.5,
              }}
            >
              Növbəti səyahətinizi planlaşdırın
            </Typography>

            <Typography
              sx={{
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
              }}
            >
              Azərbaycanın müxtəlif bölgələrində sizə uyğun
              oteli kəşf edin.
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={() => navigate("/hotels")}
            sx={{
              bgcolor: "#E7C58B",
              color: "#17324D",
              px: 4,
              py: 1.6,
              borderRadius: 2,
              fontWeight: 800,
              fontSize: 15,
              textTransform: "none",
              whiteSpace: "nowrap",
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#F2D6A5",
                boxShadow: "none",
              },
            }}
          >
            Otelləri kəşf et
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
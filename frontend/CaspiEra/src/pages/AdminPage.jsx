import { useState } from "react";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import LanguageSelector from "../components/navigation/LanguageSelector";
import { logout as logoutRequest } from "../features/auth/api/authApi";
import { useAuthStore } from "../features/auth/store/useAuthStore";

const sections = [
	{ id: "overview", icon: <DashboardRoundedIcon /> },
	{ id: "reservations", icon: <EventNoteRoundedIcon /> },
	{ id: "hotels", icon: <HotelRoundedIcon /> },
	{ id: "cities", icon: <LocationCityRoundedIcon /> },
	{ id: "customers", icon: <PeopleAltRoundedIcon /> },
	{ id: "reviews", icon: <RateReviewRoundedIcon /> },
];

export default function AdminPage({ serverError = null }) {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const refreshToken = useAuthStore((state) => state.refreshToken);

	const clearAuth = useAuthStore((state) => state.logout);
    
	const [activeSection, setActiveSection] = useState("overview");

	const handleLogout = async () => {
		try {
			if (refreshToken) {
				await logoutRequest(refreshToken);
			}
		} catch (error) {
			console.error("Admin logout failed:", error);
		} finally {
			clearAuth();
			navigate("/", { replace: true });
		}
	};

	const metrics = [
		{ id: "reservations", icon: <EventNoteRoundedIcon />, color: "admin.orange", background: "admin.orangeSoft" },
		{ id: "revenue", icon: <AccountBalanceWalletRoundedIcon />, color: "admin.green", background: "admin.greenSoft" },
		{ id: "hotels", icon: <HotelRoundedIcon />, color: "admin.blue", background: "admin.blueSoft" },
		{ id: "customers", icon: <PeopleAltRoundedIcon />, color: "admin.purple", background: "admin.purpleSoft" },
	];

	return (
		<Box sx={{ minHeight: "100dvh", bgcolor: "admin.background", color: "admin.text" }}>
			<Box
				component="header"
				sx={{
					minHeight: 76,
					px: { xs: 2, md: 3.5 },
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 2,
					bgcolor: "admin.navy",
					color: "admin.white",
					borderBottom: "1px solid",
					borderColor: "admin.navyBorder",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
					<Avatar
						variant="rounded"
						sx={{
							width: 38,
							height: 38,
							color: "admin.blue",
							bgcolor: "admin.blueSoft",
							border: "1px solid",
							borderColor: "admin.blueBorder",
						}}
					>
						<AdminPanelSettingsRoundedIcon fontSize="small" />
					</Avatar>
					<Box>
						<Typography
							sx={{
								fontSize: 18,
								fontWeight: 700,
								lineHeight: 1.1,
							}}
						>
							CaspianEra
						</Typography>
						<Typography
							variant="caption"
							sx={{ color: "admin.whiteMuted", letterSpacing: 0.3 }}
						>
							{t("admin.workspace")}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<LanguageSelector variant="contrast" />
					<Button
						variant="outlined"
						startIcon={<LogoutRoundedIcon />}
						onClick={handleLogout}
						sx={{
							px: { xs: 1, sm: 1.5 },
							color: "admin.white",
							borderColor: "admin.whiteBorder",
							fontSize: { xs: 12, sm: 14 },
							whiteSpace: "nowrap",
							textTransform: "none",
							"&:hover": {
								borderColor: "admin.blueLight",
								bgcolor: "admin.whiteHover",
							},
						}}
					>
						{t("navbar.logout")}
					</Button>
				</Box>
			</Box>

			<Box
				sx={{
					minHeight: "calc(100dvh - 76px)",
					display: "grid",
					gridTemplateColumns: {
						xs: "minmax(0, 1fr)",
						md: "224px minmax(0, 1fr)",
					},
				}}
			>
				<Box
					component="nav"
					aria-label={t("admin.navigation")}
					sx={{
						p: { xs: 1, md: 2 },
						display: "flex",
						flexDirection: { xs: "row", md: "column" },
						gap: 0.5,
						overflowX: { xs: "auto", md: "visible" },
						bgcolor: "admin.navy",
						borderRight: { md: "1px solid" },
						borderBottom: { xs: "1px solid", md: 0 },
						borderColor: "admin.navyBorder",
					}}
				>
					{sections.map((section, index) => (
						<Box key={section.id} sx={{ display: "contents" }}>
							{index === 1 && (
								<Divider
									sx={{
										my: 1.25,
										borderColor: "admin.navyDivider",
										display: { xs: "none", md: "block" },
									}}
								/>
							)}
							<Button
								onClick={() => setActiveSection(section.id)}
								aria-current={activeSection === section.id ? "page" : undefined}
								startIcon={section.icon}
								sx={{
									flexShrink: 0,
									justifyContent: "flex-start",
									minWidth: { xs: "auto", md: 0 },
									px: { xs: 1.25, md: 1.5 },
									py: 1.15,
									color:
										activeSection === section.id
											? "admin.white"
											: "admin.whiteSecondary",
									bgcolor:
										activeSection === section.id
											? "admin.whiteHover"
											: "transparent",
									borderLeft: {
										xs: 0,
										md: activeSection === section.id
											? "2px solid"
											: "2px solid transparent",
									},
										borderColor: "admin.blue",
									whiteSpace: "nowrap",
									"& .MuiButton-startIcon": {
										color:
											activeSection === section.id
												? "admin.blueLight"
												: "inherit",
									},
									"&:hover": {
										bgcolor: "admin.whiteHover",
										color: "admin.white",
									},
								}}
							>
								{t(`admin.sections.${section.id}`)}
							</Button>
						</Box>
					))}
				</Box>

				<Box
					component="main"
					sx={{
						minWidth: 0,
						px: { xs: 2, sm: 3, lg: 5 },
						py: { xs: 3, md: 4.5 },
					}}
				>
					<Box sx={{ mb: { xs: 3, md: 4 } }}>
						<Typography
							component="p"
							variant="overline"
							sx={{ color: "admin.blue", fontWeight: 700 }}
						>
							{t("admin.workspace")}
						</Typography>
						<Typography
							component="h1"
							sx={{
								mt: 0.4,
								fontSize: { xs: 32, md: 42 },
								fontWeight: 700,
								lineHeight: 1.12,
								color: "admin.text",
							}}
						>
							{t(`admin.sections.${activeSection}`)}
						</Typography>
					</Box>

					{activeSection === "overview" ? (
						<>
							<Box
								component="section"
								aria-label={t("admin.metricsLabel")}
								sx={{
									mb: { xs: 3.5, md: 5 },
									display: "grid",
									gridTemplateColumns: {
										xs: "repeat(2, minmax(0, 1fr))",
										lg: "repeat(4, minmax(0, 1fr))",
									},
										bgcolor: "admin.surface",
									borderTop: "1px solid",
									borderBottom: "1px solid",
									borderColor: "admin.border",
								}}
							>
								{metrics.map((metric, index) => (
									<Box
										key={metric.id}
										component="article"
										sx={{
											minWidth: 0,
											px: { xs: 1.5, sm: 2.5, md: 3 },
											py: { xs: 2, md: 2.75 },
											borderRight: {
												xs: index % 2 === 0 ? "1px solid" : 0,
												lg: index < metrics.length - 1 ? "1px solid" : 0,
											},
											borderBottom: {
												xs: index < 2 ? "1px solid" : 0,
												lg: 0,
											},
											borderColor: "admin.border",
										}}
									>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<Box
												sx={{
													color: metric.color,
													display: "flex",
													p: 0.5,
													borderRadius: 1,
														bgcolor: metric.background,
													"& svg": { fontSize: 18 },
												}}
											>
												{metric.icon}
											</Box>
											<Typography
												variant="body2"
												sx={{ color: "admin.muted", lineHeight: 1.35 }}
											>
												{t(`admin.metrics.${metric.id}`)}
											</Typography>
										</Box>
										<Typography
											sx={{
												mt: 1.25,
											color: "admin.text",
												fontSize: { xs: 27, md: 32 },
												fontWeight: 600,
												lineHeight: 1,
											}}
										>
											—
										</Typography>
									</Box>
								))}
							</Box>

							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: {
										xs: "minmax(0, 1fr)",
										xl: "minmax(0, 1fr)",
									},
									alignItems: "start",
									gap: { xs: 3, xl: 4 },
								}}
							>
								<Box component="section" aria-labelledby="recent-reservations-title">
									<Box
										sx={{
											mb: 1.5,
											display: "flex",
											alignItems: "baseline",
											justifyContent: "space-between",
											gap: 2,
										}}
									>
										<Typography
											id="recent-reservations-title"
											component="h2"
											sx={{ fontSize: 19, fontWeight: 700, color: "admin.text" }}
										>
											{t("admin.recentReservations")}
										</Typography>
										<Typography variant="caption" sx={{ color: "admin.muted" }}>
											{t("admin.latestActivity")}
										</Typography>
									</Box>
									<TableContainer
										sx={{
											bgcolor: "admin.surface",
											border: "1px solid",
											borderColor: "admin.border",
										}}
									>
										<Table size="small" aria-label={t("admin.recentReservations")}>
											<TableHead>
												<TableRow>
													{["reservation", "guest", "property", "amount"].map((column) => (
														<TableCell
															key={column}
															sx={{
																py: 1.5,
															color: "admin.muted",
															bgcolor: "admin.subtleSurface",
																fontSize: 12,
																fontWeight: 700,
																whiteSpace: "nowrap",
															}}
														>
															{t(`admin.columns.${column}`)}
														</TableCell>
													))}
												</TableRow>
											</TableHead>
											<TableBody>
												<TableRow>
													<TableCell colSpan={4}>
														<Box
															role="status"
															sx={{ py: 4, textAlign: "center" }}
														>
																<AdminDataMessage error={serverError} />
														</Box>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableContainer>
								</Box>
							</Box>
						</>
					) : (
						<Box
							component="section"
							role="status"
							sx={{
								minHeight: 270,
								p: { xs: 2.5, md: 4 },
								display: "grid",
								placeContent: "center",
								textAlign: "center",
								bgcolor: "admin.surface",
								borderTop: "2px solid",
								borderColor: "admin.blue",
							}}
						>
							<AdminDataMessage error={serverError} />
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
}

function AdminDataMessage({ error }) {
	const { t } = useTranslation();

	if (error) {
		const responseData = error?.response?.data;
		const message =
			typeof error === "string"
				? error
				: typeof responseData === "string"
					? responseData
					: responseData?.message ||
						responseData?.title ||
						(Array.isArray(responseData?.errors)
							? responseData.errors.join(" ")
							: "") ||
						(error?.response ? t("admin.serverError") : error?.message) ||
						t("admin.serverError");

		return (
			<Alert
				severity="error"
				variant="outlined"
				role="alert"
				sx={{
					mx: "auto",
					maxWidth: 520,
					color: "admin.error",
					borderColor: "admin.error",
					bgcolor: "admin.errorSoft",
					textAlign: "left",
					"& .MuiAlert-icon": { color: "admin.error" },
				}}
			>
				{message}
			</Alert>
		);
	}

	return (
		<Typography sx={{ fontWeight: 700, color: "admin.text" }}>
			{t("admin.emptyTitle")}
		</Typography>
	);
}

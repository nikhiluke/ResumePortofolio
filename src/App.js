import React, { useEffect, useState } from "react";
import {
	createTheme,
	ThemeProvider,
	CssBaseline,
	Container,
	CircularProgress,
	Box,
} from "@mui/material";
import EducationSummary from "./components/EducationSummary";
import ProfileAndSummary from "./components/ProfileAndSummary";
import CompanyTimeLine from "./components/CompanyTimeLine";
import ProjectSummarySlide from "./components/ProjectsSummarySlide";
import HeaderBar from "./components/HeaderBar";
import GoToTop from "./components/GoToTop";
import SummaryBoxChip from "./components/SummaryBoxChip";

function App() {
	const [resumeData, setResumeData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		fetch("/Resume.json")
			.then((response) => response.json())
			.then((data) => {
				setResumeData(data);
				setLoading(false); // Stop loading after fetching data
			});
	}, []);

	const theme = createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
			primary: { main: "#4a90e2" },
			background: { default: darkMode ? "#121212" : "#f9f9f9" },
			text: {
				primary: darkMode ? "#ffffff" : "#333333",
				secondary: darkMode ? "#bbbbbb" : "#666666",
			},
		},
		typography: {
			fontFamily: "Arial, sans-serif",
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HeaderBar darkMode={darkMode} setDarkMode={setDarkMode} />
			<Container maxWidth="lg" sx={{ py: 4 }}>
				{loading ? (
					<Box textAlign="center" sx={{ mt: 10 }}>
						<CircularProgress />
					</Box>
				) : (
					<>
						<ProfileAndSummary
							profile={resumeData.profile}
							summary={resumeData.summary}
						/>
						<CompanyTimeLine companies={resumeData.companies} />
						<ProjectSummarySlide projects={resumeData.projects} />
						<SummaryBoxChip
							heading="Skills"
							summaryArr={resumeData.skills}
							chipColor="primary"
						/>
						<SummaryBoxChip
							heading="Tools"
							summaryArr={resumeData.tools}
							chipColor="secondary"
						/>
						<EducationSummary education={resumeData.education} />
						<GoToTop />
					</>
				)}
			</Container>
		</ThemeProvider>
	);
}

export default App;

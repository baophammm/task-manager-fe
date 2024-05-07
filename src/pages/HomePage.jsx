import React from "react";
import useAuth from "../hooks/useAuth";
import { Box, Typography } from "@mui/material";

const welcomeSentenceFunction = (userName) => {
  const welcomeSentences = [
    `Welcome back, ${userName}! Let's tackle your tasks together.`,
    `Good to see you again, ${userName}! Ready to conquer your to-do list?`,
    `Hello there, ${userName}! Your tasks await – let's make today productive.`,
    `Welcome back, ${userName}! Let's make progress on your goals.`,
    `Hi ${userName}! Time to dive into your tasks and get things done.`,
    `Hey there, ${userName}! Your tasks are lined up and ready for action.`,
    `Welcome back, ${userName}! Let's turn your plans into accomplishments.`,
    `Hello again, ${userName}! Let's make today a step closer to your dreams.`,
    `Good day, ${userName}! Let's make your task list your triumph list.`,
    `Hey ${userName}! Let's make today count by ticking off those tasks.`,
  ];

  const randomIndex = Math.floor(Math.random() * welcomeSentences.length);
  const welcomeSentence = welcomeSentences[randomIndex];

  return welcomeSentence;
};

function HomePage() {
  const auth = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        p: 10,
        gap: 4,
      }}
    >
      <Typography variant="h2" textAlign="center">
        {welcomeSentenceFunction(auth.user.firstName)}
      </Typography>
      <Typography variant="h5" textAlign="center">
        Begin your journey by exploring your Projects, Tasks, and Invitations in
        the header menu bar above.
      </Typography>
    </Box>
  );
}

export default HomePage;

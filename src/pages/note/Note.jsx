import { Box } from "@mui/material";

import PageTitle from "../../components/pagetitle/PageTitle";
import NoteCard from "../../components/notecard/NoteCard";

const Note = () => {
  return (
    <Box
      className="note__container"
      component="div"
      sx={{
        marginBottom: "16px",
        width: "90%",
      }}
    >
      <PageTitle>Notes</PageTitle>
      <NoteCard />
    </Box>
  );
};

export default Note;

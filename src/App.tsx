import {
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import { Container } from "reactstrap";
import FaqPage from "./FaqPage";
import FlashMessage from "./FlashMessage";
import IndexPage from "./IndexPage";
import MyNav from "./MyNav";
import NewEntryForm from "./NewEntryForm";
import ShowPage from "./ShowPage";
import type { NewEntry, NewEntryErrors } from "./sharedTypes";
import data from "./seeddata.json";

function SkipNavLink({ skipId }: { skipId: string }) {
  return (
    <a className="visually-hidden-focusable" href={`#${skipId}`}>
      Skip to content
    </a>
  );
}

function MainLayout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <SkipNavLink skipId="main-content" />
      <MyNav />
      <Container>
        <main id="main-content">
          <FlashMessage />
          {children}
        </main>
        <footer className="py-3 mt-auto">Copyright AppFolio Inc.</footer>
      </Container>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data: NewEntry) => {
    const { title, body, favoriteColor, team } = data;

    const errors: NewEntryErrors = {};
    if (title.length === 0) errors.title = "You must enter a title";
    if (body.length === 0) errors.body = "You must enter a body";
    if (!favoriteColor) errors.favoriteColor = "You must enter a color";
    if (!team) errors.team = "You must enter a team";

    if (!(errors.title || errors.body || errors.favoriteColor || errors.team)) {
      await navigate("/", {
        state: {
          flashMessage: {
            color: "success",
            message: "Successfully added new entry",
          },
        },
      });
    }
    return errors;
  };

  const [entries] = React.useState(data);

  return (
    <MainLayout>
      <Routes location={location}>
        <Route path="/" element={<IndexPage entries={entries} />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route
          path="/entries/new"
          element={<NewEntryForm onSubmit={onSubmit} />}
        />
        <Route
          path="/entries/:title"
          element={<ShowPage entries={entries} />}
        />
      </Routes>
    </MainLayout>
  );
}

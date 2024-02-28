// Import des fonctions de rendu et d'écran de testing
import { render, screen } from "@testing-library/react";
// Import de MemoryRouter pour simuler les routes
import { MemoryRouter } from "react-router-dom";
// Import du composant des routes de l'application
import AppRoutes from "./AppRoutes";

// Mock des composants des fonctionnalités de posts
jest.mock("../features/posts/PostsList", () => {
  // Composant mocké pour la liste des posts
  const MockPostsList = () => (
    <div>Your Matcher for PostsList component here</div>
  );
  return MockPostsList;
});

jest.mock("../features/posts/PostDetails", () => {
  // Composant mocké pour les détails d'un post
  const MockPostDetails = () => (
    <div>Your matcher for PostDetails component here</div>
  );
  return MockPostDetails;
});

jest.mock("../features/posts/NewPostForm", () => {
  // Composant mocké pour le formulaire de création d'un nouveau post
  const MockNewPostForm = () => (
    <div>Your matcher for NewPostForm component here</div>
  );
  return MockNewPostForm;
});

jest.mock("../features/posts/PostEditForm", () => {
  // Composant mocké pour le formulaire de modification d'un post
  const MockPostEditForm = () => (
    <div>Your matcher for PostEditForm component here</div>
  );
  return MockPostEditForm;
});

// Mock de l'URL de l'API
jest.mock("../constants", () => ({
  API_URL: "http://your-test-api-url",
}));

// Description des tests du composant AppRoutes
describe("AppRoutes component", () => {
  // Fonction utilitaire pour rendre avec un routeur
  const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
    });
  };

  // Test : le chemin racine rend la liste des posts
  test("root path renders PostsList", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/"] });
    const expectedText = "Your Matcher for PostsList component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  // Test : le chemin des détails d'un post rend les détails du post
  test("post details path renders PostDetails", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1"] });
    const expectedText = "Your matcher for PostDetails component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  // Test : le chemin /new rend le formulaire de création d'un nouveau post
  test("/new path renders NewPostForm", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/new"] });
    const expectedText = "Your matcher for NewPostForm component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  // Test : le chemin /posts/:id/edit rend le formulaire de modification d'un post
  test("/posts/:id/edit path renders EditPostForm", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1/edit"] });
    const expectedText = "Your matcher for PostEditForm component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

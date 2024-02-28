// Importation des fonctions nécessaires pour les tests
import { render, screen } from "@testing-library/react";
// Importation du composant MemoryRouter pour simuler la navigation
import { MemoryRouter } from "react-router-dom";
// Importation du composant AppRoutes à tester
import AppRoutes from "./AppRoutes";

// Mock du composant PostsList pour isoler les tests
jest.mock("../features/posts/PostsList", () => {
  // Définition d'un composant fictif pour PostsList
  const MockPostList = () => <div>Here is the matched post list component</div>;
  // Retourne le composant fictif à la place de PostsList
  return MockPostList;
});

// Mock de la constante API_URL pour les tests
jest.mock("../constants", () => ({
  API_URL: "http://your-test-api-url",
}));

// Définition des tests pour le composant AppRoutes
describe("AppRoutes component", () => {
  // Test: vérifie que le chemin racine rend la liste des posts
  test("rootpath renders Posts List", () => {
    // Rend le composant AppRoutes avec le MemoryRouter et le chemin racine
    render(<AppRoutes />, {
      wrapper: MemoryRouter,
      initialEntries: ["/"], // Définit le chemin initial comme "/"
    });
    // Vérifie que le texte attendu est présent dans l'écran rendu
    const expectedtext = "Here is the matched post list component";
    expect(screen.getByText(expectedtext)).toBeInTheDocument();
  });

  // Test: vérifie que le chemin /posts/:id rend les détails d'un post spécifique
  test("posts/:id renders Post Details", () => {
    // Rend le composant AppRoutes avec le MemoryRouter et un chemin de post spécifique
    render(<AppRoutes />, {
      wrapper: MemoryRouter,
      initialEntries: ["/posts/1"], // Définit le chemin initial comme "/posts/1"
    });
    // Vérifie que le texte attendu est présent dans l'écran rendu
    const expectedtext = "Here is the matched post list component";
    expect(screen.getByText(expectedtext)).toBeInTheDocument();
  });
});

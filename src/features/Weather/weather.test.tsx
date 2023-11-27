import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Weather from "./Weather";

const mockWeatherData = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [{ id: 721, main: "Haze", description: "haze", icon: "50n" }],
  base: "stations",
  main: {
    temp: 9.47,
    feels_like: 7.07,
    temp_min: 7.78,
    temp_max: 10.71,
    pressure: 1002,
    humidity: 93
  },
  visibility: 3900,
  wind: { speed: 4.63, deg: 240 },
  clouds: { all: 100 },
  dt: 1701050574,
  sys: {
    type: 2,
    id: 2075535,
    country: "GB",
    sunrise: 1701070656,
    sunset: 1701100727
  },
  timezone: 0,
  id: 2643743,
  name: "London",
  cod: 200
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("<Weather />", () => {
  it("fetch London and render weather info", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    const mockResolveValue = {
      json: () => new Promise((resolve) => resolve(mockWeatherData)),
      ok: true
    };

    fetchSpy.mockResolvedValue(mockResolveValue as Response);

    render(<Weather />, { wrapper });

    await userEvent.type(screen.getByRole("textbox"), "London");

    await userEvent.click(screen.getByText("search"));

    const weatherInfoBlock = await screen.findByTestId("w-info");

    expect(weatherInfoBlock).toBeTruthy();
  });
});

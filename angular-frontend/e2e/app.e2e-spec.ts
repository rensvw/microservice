import { Tutorial2Page } from "./app.po";

describe("tutorial2 App", function() {
  let page: Tutorial2Page;

  beforeEach(() => {
    page = new Tutorial2Page();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});

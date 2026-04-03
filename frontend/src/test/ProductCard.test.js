test('displays star rating', () => {
    renderProductCard();
    // Rating count text may be wrapped by visual-edit elements
    const ratingElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('120');
    });
    expect(ratingElements.length).toBeGreaterThan(0);
  });
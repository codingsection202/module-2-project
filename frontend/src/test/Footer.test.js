test('opens Privacy Policy modal when clicked', () => {
    renderFooter();
    fireEvent.click(screen.getByTestId('footer-privacy'));
    expect(screen.getByTestId('privacy-modal')).toBeInTheDocument();
    expect(screen.getByText('Information We Collect')).toBeInTheDocument();
  });

  test('opens Terms & Conditions modal when clicked', () => {
    renderFooter();
    fireEvent.click(screen.getByTestId('footer-terms'));
    expect(screen.getByTestId('terms-modal')).toBeInTheDocument();
    expect(screen.getByText('Acceptance of Terms')).toBeInTheDocument();
  });
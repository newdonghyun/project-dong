# Project Blueprint: Lotto Recommendation Site

## Overview
A modern, web-based Lotto Recommendation application designed to provide users with a visually engaging way to generate potential winning lottery numbers. The application focuses on a premium user experience with interactive animations, vibrant colors, and a clean, responsive interface.

## Project Details & Features

### Visual Design
- **Typography**: Expressive sans-serif fonts for a modern feel.
- **Colors**: Utilizing `oklch` for vibrant colors corresponding to traditional lotto ball categories (1-10: Yellow, 11-20: Blue, 21-30: Red, 31-40: Grey, 41-45: Green).
- **Layout**: Centered, card-based layout with subtle noise textures and deep shadows to create depth.
- **Interactivity**: Smooth transitions and "glow" effects on buttons and interactive elements.
- **Responsiveness**: Mobile-first design using container queries and flexible grids.

### Features
- **Random Number Generation**: Generates 6 unique numbers between 1 and 45.
- **Visual Balls**: Each number is displayed inside a stylized ball with its respective category color.
- **Interactive Animation**: A "Generating..." state with animations before revealing the numbers.
- **History/Save (Future)**: Ability to keep track of generated numbers in the current session.

## Implementation Plan

### Step 1: HTML Structure (`index.html`)
- Define the main container for the lotto generator.
- Create a placeholder for the generated balls.
- Add a "Generate Numbers" button with appropriate styling hooks.

### Step 2: Modern CSS Styling (`style.css`)
- Use CSS Variables for the color palette.
- Implement `@layer` for organized styling.
- Use `oklch()` for perceptually uniform and vibrant colors.
- Add multi-layered shadows and subtle background textures.
- Ensure responsiveness with media queries and container queries.

### Step 3: JavaScript Logic (`main.js`)
- Implement the number generation algorithm (ensuring no duplicates).
- Sort the generated numbers.
- Create a function to map numbers to their respective ball colors.
- Handle DOM manipulation to animate the "reveal" of the numbers.

### Step 4: Refinement & Validation
- Check for accessibility (ARIA labels, contrast).
- Verify mobile responsiveness.
- Monitor console for any errors.

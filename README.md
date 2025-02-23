# Cartoon Reaction Component

## Introduction

`CartoonReaction` is a fun and interactive React component where a cartoon character reacts to your mouse movement. The character's gaze follows the cursor, and the buttons provide a playful way to interact with it.

## Setup

Make sure you have [Node.js](https://nodejs.org/) installed, then run the following commands to create the project and install dependencies:

```sh
npx create-vite cartoon-game --template react
cd cartoon-game
npm install
npm install framer-motion
npm install @shadcn/ui
npm run dev
```

## Demo

Here’s a preview of how the `CartoonReaction` component works:

<img src="./img/demo.gif" width="300px" height="auto" alt="Cartoon Reaction Demo">

## Features

- **Mouse tracking**: The cartoon character's gaze follows your cursor movement.
- **Interactive buttons**:
  - The "Agree" button grows in size, making it more appealing.
  - The "Reject" button shrinks and moves randomly, making it harder to click.
- **User input interaction**: A text input field lets users enter specific words to trigger Easter eggs.

## Tech Stack

- **React** - Component-based UI
- **Tailwind CSS** - Fast styling
- **JavaScript** - Handles interactivity

## Customization

You can modify this component to fit your needs:

- **Change the images**: Replace the files in the `./img/` folder to customize the character's expressions.
- **Adjust the interactions**: Modify button behavior, making it easier or harder to click.
- **Style changes**: Use Tailwind CSS to tweak colors, animations, or layouts to match your design.

## Contributions

Contributions are welcome! If you have ideas or bug fixes, feel free to submit a pull request. Please ensure your changes are well-tested before submitting.

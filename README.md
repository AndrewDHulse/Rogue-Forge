# Rogue Forge

A web application for managing character sheets for tabletop role-playing games (RPGs).

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

The Character Sheet Manager is a tool designed to help Game Masters (GMs) and players of tabletop RPGs manage and organize character sheets for their campaigns. It allows users to create custom character sheet templates, fill in character information, and view character details during gameplay.

## Features

- Create and manage character sheet templates with various field types (text, number, checkbox, and soon to come-dropdown).
- Generate character sheets based on selected templates and fill in character information.
- Easy Collaboration through a virtual whiteboard for dice rolling and note-taking.
- Responsive and user-friendly interface for both GMs and players.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- MongoDB database

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/character-sheet-manager.git
   cd character-sheet-manager
   ```
2. Set up environment variables:
    Create a .env file in the root directory and add the following:
    ```
    MONGODB_URI=your-mongodb-uri
    SECRET_KEY=your-secret-key
    ```
3. Start the development server:
    ```
    npm start
    ```
## Usage

1. Sign in or create an account.
2. Create a new session or choose an existing one.
3. Manage character sheet templates in the "Templates" section.
4. Generate character sheets in the "Create a Character" section.
5. Interact with the virtual whiteboard and dice roller during gameplay.
6. View and manage character sheets in the sidebar.

## Code Preview
Rogue Forge features dynamic Character Sheet creation, handles by the dynamic and modular nature of React. 
```
  <form onSubmit={handleSubmit}>
                <label>
                    Template Name: 
                </label>
                &nbsp;
                    <input
                        type="text"
                        value={templateName}
                        onChange={handleTemplateNameChange}
                        required
                        style={{marginTop: "10"}}
                    />
                {fields.map((field, index) =>(
                    <div key={index} style={{ marginBottom: "10px" }}>
                    <CharacterSheetField
                        index={index}
                        field={field}
                        onChange={handleFieldChange}
                        handleDropdownOptionChange ={handleDropdownOptionChange}
                        handleRemoveDropdownOption={handleRemoveDropdownOption}
                        handleAddDropdownOption={handleAddDropdownOption}
                    />
```
Included is a live preview section, so DM's can see just what their players will see.
```
            {/* Preview section */}
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                <h2>Preview</h2>
                <hr />
                <h3 className="preview-template-name">{templateName}</h3>
                {/* Render dynamic fields for preview */}
                {fields.map((field, index) => (
                    <div key={index}>
                        <hr />
                        {/* Render different field types */}
                        {field.type === "checkbox" && <CheckboxField label={field.label} />}
                        {field.type === "number" && <NumberField label={field.label} />}
                        {field.type === "text" && <TextField label={field.label} />}
                        {field.type === "dropdown" && (
                            <select
                                id={field._id}
                                name={field.label}
                                value={field.dropdownValue}
                                onChange={(e) => {
                                    // Dropdown logic
                                }}
                            >
                                {field.dropdownOptionsArray.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
```

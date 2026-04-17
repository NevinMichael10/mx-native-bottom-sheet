# Mendix Native Bottom Sheet Widget

A powerful, native bottom sheet pluggable widget for Mendix Native Mobile applications. 

This widget provides highly customizable bottom sheet components natively integrated with Mendix. It supports both blocking **Modal** action menus and **Expanding** persistent panes with drag-to-reveal gesture support.

## 🚀 Why Use This Widget?
* **Fluid Notifications & Actions**: Show supplementary content or menus naturally anchored to the bottom of the user's screen.
* **Native Performance**: Leverages native gesture handlers and Reanimated for buttery smooth 60FPS animations.
* **Highly Customizable**: Every visual component can be themed, including fully custom dropped-in Mendix widgets instead of simple static actions.
* **Cross-Platform Consistency**: Uniform behaviors for both iOS and Android, with an optional switch to use iOS's strictly native Action Sheet (`ActionSheetIOS`).

## 🛠️ Technology Stack
This widget is built using the latest native toolchain standards for Mendix 10+:
* **Mendix Pluggable Widgets API**: `@mendix/pluggable-widgets-tools` (v11.6+)
* **Core Interface**: React 19 & React Native `~0.78`
* **Underlying Engine**: `@gorhom/bottom-sheet` handling the core layout algorithms.
* **Animation & Gestures**: `react-native-reanimated` & `react-native-gesture-handler`.

## 📦 How to Use in Studio Pro
1. Import the built `.mpk` widget file into your Mendix project (`widgets` directory).
2. Open your Mendix native page in Studio Pro.
3. Drag the **Bottom Sheet** widget onto your page.
4. Open the widget's properties:
   * **General > Type**: Select whether you want it to act as an interruption (`Modal`) or a sliding extension (`Expanding`).
   * **Trigger attribute**: Wire up a boolean Context object attribute. Set this attribute to `true` via a Nanoflow when the user taps a button to open the sheet.
   * **Configuration Layers**: Map your desired content. Use the "Items" configurator for a standard action menu, or swap the Render mode to "Custom" to drop standard Mendix widgets inside the sheet.
5. In your styling profile (`theme/native/app.js`), define a custom JSON styling class and set the class name to the **Class** string field of the widget in Mendix.

## 🎨 How to Customize (Theming & Styling)
This widget uses the standard React Native styling architectures. You can independently style:
* The wrapper `container`
* The dark `backdrop` overlay
* The drag `handle` and its visual `handleIndicator`
* The typography of `modalItems` mapped directly to Studio Pro style buttons (Primary, Danger, etc.)

Check the included [bottom_sheet_styling_guide.md](./bottom_sheet_styling_guide.md) within this repository to see a full implementation example with all supported attributes.

## 💻 Development & Building Requirements
If you wish to fork and modify the source structure of this widget, ensure you are running `Node.js >= 20`. 

### Running Locally
To run the widget locally and hot-reload changes directly into an active Mendix project:

1. Validate your configurations: Verify that the `projectPath` variable in `package.json` points to your exact Mendix project folder.
2. Install Dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Watch & Compile:
   ```bash
   npm run start
   ```
   *Any changes to the TSX/TS files will automatically trigger an incremental bundle into your Mendix test project.*

### Building the Release Artifact
When development is complete, compile the final `.mpk` widget artifact by running:
```bash
npm run build
```
Or for an optimized production release:
```bash
npm run release
```
The compiled widget will be output into the `dist` directory and pushed into your configured Mendix `projectPath`.

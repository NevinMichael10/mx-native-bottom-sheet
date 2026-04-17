# Bottom Sheet Widget for Mendix Native Mobile

The Bottom Sheet widget is a robust, highly customizable native widget for Mendix that allows you to present supplementary content or action menus anchored to the bottom of the screen. Under the hood, it leverages the powerful `@gorhom/bottom-sheet` library, bringing fluid 60FPS animations and natural gesture interactions to your Mendix native applications.

---

## 1. Widget Types & Behaviors

The widget provides two fundamentally different interaction paradigms which you can select from the **Type** dropdown.

### Type: Modal
A "Modal" bottom sheet is hidden by default and acts as an overlay that temporarily halts the user's primary workflow to present necessary information or choices (like a context menu).

* **Triggering**: Modal visibility is controlled exclusively by a boolean attribute linked to the **Trigger attribute** property.
    * Set it to `true` via a Microflow or Nanoflow to open the sheet.
    * The widget automatically sets it to `false` when the user swipes down to close it or taps the backdrop.
* **Rendering Modes**:
    * **Basic**: Automatically generates a stack of touchable action buttons based on your static configurations. This acts like a standard system Action Sheet.
    * **Custom**: Provides an empty widget dropzone (via the *Visible on first drag* container area) allowing you to freely model any Mendix layout (e.g., input forms, lists, confirmation messages).

### Type: Expanding
An "Expanding" bottom sheet acts as a persistent pane that smoothly slides up from the bottom over the main content without acting as a blocking modal. This is generally used for continuous interactions (like a map application dragging up a details pane).

* **Interaction**: The user drags up from the bottom of the screen to reveal more content.
* **Snap Points**: You configure "zones" consisting of different Mendix widgets that dictate how the height of the sheet locks into place:
    * **Always visible**: (Header area) This is the collapsed state. It always stays on the screen.
    * **Visible on first drag**: The first expansion zone (snaps to halfway or dynamic size of content).
    * **Visible on drag to top of screen**: An optional third expansion state allowing the sheet to cover up to 95% of the screen.

---

## 2. Configuration Properties Reference

### General Settings
* **Type**: `Modal` or `Expanding`.
* **Trigger attribute** (Modal only): A boolean Mendix context attribute to control visibility.
* **Render** (Modal only): `Basic` for action blocks or `Custom` for freeform Mendix widgets.
* **Items** (Basic Modal only): A list of action buttons. Each item lets you define a **Caption**, a Mendix **Action**, and a **Style** (Default, Primary, Danger, Custom).
* **Native iOS variant** (Basic Modal only): If set to `Yes`, iOS devices will render the completely native iOS `ActionSheetIOS` menu instead of a custom UI sheet. Setting this to `No` forces a unified cross-platform appearance.

### Handle / Drag Indicator
* **Use custom handle**: If `Yes`, exposes a widget dropzone to model your own drag handle element, completely overriding the default grey indicator pill.
* **Custom handle**: The widget container dropzone for the handle.

### Content Containers (Expanding & Custom Modal)
* **Always visible** (Expanding): Dropzone for the always-visible resting header (e.g. "Drag up for more information").
* **Visible on first drag** (Expanding & Custom Modal): The core content area of the sheet. Note that in Custom Modal mode, this maps directly to the interior content.
* **Enable full screen** (Expanding): Toggle to `Yes` to expose a third, higher snap point.
* **Visible on drag to top of screen** (Expanding): Dropzone for content available when dragged to max height.

### Events (Expanding only)
* **On open**: Mendix action triggered when the sheet moves out of the fully collapsed phase.
* **On close**: Mendix action triggered when the sheet returns entirely to the fully collapsed phase.

---

## 3. Styling & Theming the Bottom Sheet

The widget maps standard React Native `<ViewStyle>` and `<TextStyle>` objects to its internal components via Mendix classnames. You can define customizations in your `theme/native/app.js` file and assign the classname to the widget's **Class** field in Studio Pro.

### Supported Styling Architecture

| Property | Purpose | Applicable Mode | Scope Type |
| :--- | :--- | :--- | :--- |
| `container` | The main visual background of the sheet (bg-color, borders, shadow) | All | `ViewStyle` |
| `containerWhenExpandedFullscreen` | An override triggered when the Expanding modal hits the top of the screen (used to flatten radiuses) | Expanding | `ViewStyle` |
| `modal` | Targets the invisible wrapper container managing the overlay | Modal | `ViewStyle` |
| `backdrop` | The darkened overlay behind the sheet | Modal | `ViewStyle` |
| `handle` | The container spanning the top of the sheet | All | `ViewStyle` |
| `handleIndicator` | The default grey dragging pill shape | All | `ViewStyle` |
| `modalItems.container` | Spacing and borders around each Action button | Basic Modal | `ViewStyle` & `rippleColor` |
| `modalItems.*` | Distinct text typography `(defaultStyle, primaryStyle, dangerStyle, customStyle)` | Basic Modal | `TextStyle` |

### External Theme File Example

```javascript
// Add to your theme/native/app.js or custom-variables.js

export const professionalBottomSheet = {
    // 1. Container styling (the sheet itself)
    container: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    // 2. Fullscreen expanded override
    containerWhenExpandedFullscreen: {
        backgroundColor: "#FAFAFA",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0, // Flattens corners when reaching top of screen
    },

    // 3. Modal-specific wrapper
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },

    // 4. Modal Action Items (applicable if Render = Basic)
    modalItems: {
        container: {
            paddingVertical: 18,
            borderBottomWidth: 1,
            borderBottomColor: "#EFEFEF",
            rippleColor: "rgba(0, 0, 0, 0.05)" // Android touch feedback
        },
        defaultStyle: { fontSize: 16, color: "#333333", textAlign: "center" },
        primaryStyle: { fontSize: 16, color: "#0056D2", fontWeight: "600", textAlign: "center" },
        dangerStyle: { fontSize: 16, color: "#D32F2F", fontWeight: "bold", textAlign: "center" },
        customStyle: { fontSize: 16, color: "#2E7D32", fontStyle: "italic", textAlign: "left", paddingLeft: 20 }
    },

    // 5. Native Handle
    handle: {
        paddingTop: 16,
        paddingBottom: 8,
    },

    // 6. Native Drag Indicator
    handleIndicator: {
        backgroundColor: "#E0E0E0",
        width: 48,
        height: 5,
        borderRadius: 4,
    },

    // 7. Dark Backdrop (Modal only)
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.45)",
    }
};
```

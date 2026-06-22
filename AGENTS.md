## Commands

## Key Conventions

## Architecture Notes

## Known Issues

## Git Commits

## UI/UX Design System

### Colors
- **Background gradient**: `#0f172a` (dark navy) → `rgba(88,28,135,0.9)` (purple) → fade
- **Primary brand**: Teal `#00635A` (tab bar, splash bottom card)
- **Accent**: Orange `#f97316` (active tab, CTAs, links)
- **Text**: White `#FFFFFF` on dark backgrounds
- **Surfaces**: White `#FFFFFF` for cards/buttons on gradient bg
- **Inactive text**: `rgba(255,255,255,0.6)` — soft white

### Typography
- **Headings**: `Montserrat.Bold` (brand name, section titles)
- **Body**: `Inter.Regular` (descriptions, labels)
- **Medium emphasis**: `Inter.Medium` or `Inter.SemiBold`
- **Button text**: `Montserrat.Bold` (CTAs), `Inter.Medium` (social buttons)

### Layout Patterns
- **Full-screen gradient background** using `react-native-linear-gradient`
- **Content sits directly on gradient** (no separate white cards)
- **ScrollView** with `flexGrow: 1` + `justifyContent: center` for vertical centering
- **Padding**: `28px` horizontal, `40px` vertical

### Component Patterns
- **Buttons**: `TouchableOpacity` with `activeOpacity={0.85}`, `borderRadius: 16`, `paddingVertical: 16-17`
- **Social buttons**: White background, rounded 16px, subtle shadow/elevation, icon + label, row layout
- **Primary CTA**: Solid orange background, orange shadow glow (`shadowColor: ORANGE`)
- **OR divider**: `flexDirection: 'row'` with flex lines + centered text
- **Feature chips**: Glassmorphic (`rgba(255,255,255,0.08)` bg, thin border, rounded 20px)
- **Links**: Orange accent color, `Inter.SemiBold`

### Screen Architecture
- Each screen is self-contained — imports `GlobalFonts` for typography, defines local color constants
- Avoids reusing `AppColors` / `GlobalStyles` for layout — keeps styles local to the screen
- `react-native-linear-gradient` for overlays and backgrounds
- Lottie animations from `assets/animations/` — colors baked in via `recolorLottie` utility

## Explaining to Users

When responding to user queries, adapt your explanation style based on the user's technical level:

- **layman**: Explain in simple, everyday terms as if the user is not technical. Avoid jargon, use analogies, and focus on what it does rather than how it works internally. Example: "It's like a form that automatically saves your answers so you don't lose them."

- **expert**: Explain in technical terms assuming the user is also a developer or technical person. Use proper terminology, mention specific files/components/functions, and explain the implementation details. Example: "The form uses React's useState hook with localStorage persistence via a custom useLocalStorage hook."
    
When unsure of the user's level, default to **expert** since this codebase is for a developer audience.
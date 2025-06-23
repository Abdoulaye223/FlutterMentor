# Color System

## Primary Colors

### Blue
```css
--blue-50: #EEF2FF;
--blue-100: #E0E7FF;
--blue-200: #C7D2FE;
--blue-300: #A5B4FC;
--blue-400: #818CF8;
--blue-500: #6366F1;
--blue-600: #4F46E5;
--blue-700: #4338CA;
--blue-800: #3730A3;
--blue-900: #312E81;
```

### Indigo
```css
--indigo-50: #F5F3FF;
--indigo-100: #EDE9FE;
--indigo-200: #DDD6FE;
--indigo-300: #C4B5FD;
--indigo-400: #A78BFA;
--indigo-500: #8B5CF6;
--indigo-600: #7C3AED;
--indigo-700: #6D28D9;
--indigo-800: #5B21B6;
--indigo-900: #4C1D95;
```

## Secondary Colors

### Gray
```css
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

## Accent Colors

### Success
```css
--success-50: #ECFDF5;
--success-100: #D1FAE5;
--success-200: #A7F3D0;
--success-300: #6EE7B7;
--success-400: #34D399;
--success-500: #10B981;
--success-600: #059669;
--success-700: #047857;
--success-800: #065F46;
--success-900: #064E3B;
```

### Warning
```css
--warning-50: #FFFBEB;
--warning-100: #FEF3C7;
--warning-200: #FDE68A;
--warning-300: #FCD34D;
--warning-400: #FBBF24;
--warning-500: #F59E0B;
--warning-600: #D97706;
--warning-700: #B45309;
--warning-800: #92400E;
--warning-900: #78350F;
```

### Error
```css
--error-50: #FEF2F2;
--error-100: #FEE2E2;
--error-200: #FECACA;
--error-300: #FCA5A5;
--error-400: #F87171;
--error-500: #EF4444;
--error-600: #DC2626;
--error-700: #B91C1C;
--error-800: #991B1B;
--error-900: #7F1D1D;
```

## Background Colors

### Light Theme
```css
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary: #F3F4F6;
```

### Dark Theme
```css
--bg-primary: #111827;
--bg-secondary: #1F2937;
--bg-tertiary: #374151;
```

## Text Colors

### Light Theme
```css
--text-primary: #111827;
--text-secondary: #4B5563;
--text-tertiary: #6B7280;
--text-disabled: #9CA3AF;
```

### Dark Theme
```css
--text-primary: #F9FAFB;
--text-secondary: #E5E7EB;
--text-tertiary: #D1D5DB;
--text-disabled: #9CA3AF;
```

## Border Colors
```css
--border-light: #E5E7EB;
--border-medium: #D1D5DB;
--border-dark: #9CA3AF;
```

## Shadow Colors
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## Gradient Colors
```css
--gradient-blue: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
--gradient-indigo: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
--gradient-success: linear-gradient(135deg, #10B981 0%, #059669 100%);
--gradient-warning: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
--gradient-error: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
```

## Usage Guidelines

### Primary Actions
- Use `--blue-600` for primary buttons
- Use `--blue-700` for hover states
- Use `--blue-200` for disabled states

### Secondary Actions
- Use `--gray-600` for secondary buttons
- Use `--gray-700` for hover states
- Use `--gray-200` for disabled states

### Text Hierarchy
- Use `--text-primary` for headings
- Use `--text-secondary` for body text
- Use `--text-tertiary` for captions
- Use `--text-disabled` for disabled text

### Feedback States
- Use success colors for positive feedback
- Use warning colors for cautionary feedback
- Use error colors for negative feedback

### Backgrounds
- Use `--bg-primary` for main content areas
- Use `--bg-secondary` for subtle distinction
- Use `--bg-tertiary` for elevated components

### Accessibility
- Ensure text colors maintain WCAG 2.1 AA contrast ratios
- Use darker shades for text on light backgrounds
- Use lighter shades for text on dark backgrounds
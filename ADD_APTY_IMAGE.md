# Adding Apty Character Image

## Where to Add the Image

1. **Place the Apty image file** in the `public/images/` directory
   - Recommended filename: `apty-character.png` or `apty-character.svg`
   - Recommended size: 512x512px or larger (will be scaled down)

2. **Update Hero Component** (`components/public/Hero.tsx`)

   Replace the placeholder div (around line 18-25) with:

   ```tsx
   import Image from 'next/image';
   
   // In the component:
   <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
     <Image 
       src="/images/apty-character.png" 
       alt="Apty - Your friendly learning guide" 
       width={256} 
       height={256} 
       className="w-full h-full object-contain drop-shadow-lg" 
       priority
     />
   </div>
   ```

## Current Design

The Hero section now features Apty on the left (desktop) or top (mobile) with the main content on the right/bottom. This creates a friendly, child-engaging first impression while keeping the design clean and uncluttered.

## Character Description

Based on your character design:
- Light blue, friendly elephant-like character
- Starry blue ears with white speckles
- Holding a yellow book
- Glowing yellow orb on trunk tip
- Warm, inviting expression

This design perfectly represents the warm, child-friendly learning approach of AptyRead!


# Explore S, A and T tracing guides

The capital S and lowercase s paths in `lib/english-tracing.json` are copied from the supplied `E:\aptyread_new\assets\curriculum\letter-tracing-data.json`. They match the path geometry in `letter-S-uppercase.svg` and `letter-s-lowercase.svg` under `E:\aptyread_new\assets\letter-paths`.

All six letter forms are now bundled with the lesson JavaScript and work offline; no CDN request is needed. The original native-app files are unchanged. Lowercase a keeps the supplied single-storey path, scaled into the smaller writing zone. Capital A and both T forms retain the supplied stroke sequence with proportions adapted to the new paper clips. Lowercase t uses the clip's straight stem instead of the native SVG's bottom hook.

The same paths drive the dotted guide and replayable Show me demonstration. Separate strokes play sequentially with a brief pen-lift pause, and the cyan starting dot moves to the active stroke. A has three strokes; a, T and t have two; S and s have one. The first dot returns after the demonstration. Opening the topic menu or hiding the page cancels the demonstration. Andika remains the reading/interface font.

Child marks use an independent indigo layer. SVG coordinates are calculated from the displayed transform, including resizing. The active pointer is captured and other pointers cannot interrupt its stroke. Starting a stroke hides the demonstration; Clear removes marks and resets it. A single tap leaves a visible dot. Reduced-motion users see the complete demonstration without the drawing animation.

The source's coverage, threshold and magnetic-validation parameters are intentionally not used. This activity is practice, with a paper alternative and a child-controlled I practised button. It does not grade handwriting or infer mastery. Confirm that the supplied formation model matches the accompanying writing videos during content review.

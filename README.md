# Moody Extension 

Combines the functionality of:
        emote (showing facial expressions) 
and     flexFX (making expressive noises)

Defines the class Mood to specify a combination of behavioural characteristics
    [staticEyes, staticMouth] give the static, quiet face.
    [blinkGap, blinkTime] govern blinking 

    [activeEyes, avtiveMouth] show the active, noisy face.
    [patternA, patternB] define behaviour(s)
s

    Layers of UI:
## Moods 
At the top level the novice is offered the simplest possible UI to select and Activate a predetermined Mood.
    
A background process is initiated, which handles the Mood's associated Pattern of behaviours.  
After a short random delay, and as long as the Mood remains Active, this Pattern gets repeated 
(in some Moods alternating with a second Pattern). 
This continues until the Mood is stopped, or a different Mood is selected and activated.

## Patterns.
On  activation, a Pattern first displays the Static facial expression for the selected Mood. 
There then follows a choreographed sequence of performances of a Reaction, typically using 
random variations of pitch & duration.

## Reactions
A Reaction synchronises the playing of a flexFX sound with the display of an associated Active face. 
Events are used to synchronise switching the display between the Static and Active faces.

Whilst the Mood is activated,  an independent background process uses timeout events to control 
blinking of the eyes at an appropriate frequency and duration for the Mood.

---

A lower-level UI will allow performance of an individual Reaction, either synchronously or asynchronously.

*/

------------------------------------------------------------


> Open this page at [https://grandpabond.github.io/pxt-emote/](https://grandpabond.github.io/pxt-emote/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/grandpabond/pxt-emote** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/grandpabond/pxt-emote** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

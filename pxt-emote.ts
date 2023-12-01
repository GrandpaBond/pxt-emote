
//% color=#402080 weight=100 icon="\uf4da" block="emote"

enum EYES {
    //% block="Open"
    OPEN,
    //% block="Sad"
    SAD,
    //% block="Shut"
    SHUT,
    //% block="Mad"
    MAD,
    //% block="Up"
    UP,
    //% block="Pop"
    POP,
    //% block="Left"
    LEFT,
    //% block="Right"
    RIGHT,
    //% block="Wink"
    WINK,
    //% block="Flip"
    FLIP
}
enum MOUTHS {
    //% block="Flat"
    FLAT,
    //% block="OK"
    OK,
    //% block="Grin"
    GRIN,
    //% block="Sulk"
    SULK,
    //% block="Hmmm"
    HMMM,
    //% block="Open"
    OPEN,
    //% block="Left"
    LEFT,
    //% block="Right"
    RIGHT,
    //% block="Shout"
    SHOUT,
    //% block="Laugh"
    LAUGH,
    //% block="Smirk"
    SMIRK,
    //% block="Kiss"
    KISS,
    //% block="Flip"
    FLIP
}
enum MOODS {
    //% block="None"
    NONE,
    //% block="Happy"
    HAPPY,
    //% block="Sad"
    SAD,
    //% block="Angry"
    ANGRY,
    //% block="Surprised"
    SURPRISED,
    //% block="Asleep"
    ASLEEP,
    //% block="Snoring"
    SNORING,
    //% block="Shiver"
    SHIVER,
    //% block="Tickled"
    TICKLED,
    //% block="Dead"
    DEAD
}
namespace emote {
    // ensure these constants match the enum ordering!
    const allEyes = [
        891,  //"Open"
        874,  //"Sad"
        864,  //"Shut"
        347,  //"Mad"
        27,   //"Up"
        561,  //"Pop"
        873,  //"Left"
        882,  //"Right"
        867,  //"Wink"
        324   //"Flip"
    ]

    const allMouths = [
        448,    //"Flat"
        4416,   //"OK"
        14880,  //"Grin"
        17856,  //"Sulk"
        14464,  //"Hmmm"
        4420,   //"Open"
        6240,   //"Left"
        13056,  //"Right"
        14660,  //"Shout"
        15204,  //"Laugh"
        6944,   //"Smirk"
        128,    //"Kiss"
        28512   //"Flip"
    ]

    let mainEyes = 0
    let mainMouth = 0
    let altEyes = 0
    let altMouth = 0
    let switching = false
    let switchGap = 0;
    let switchTime = 0
    let switchVary = 0


    /**
     * Show the selected eyes on the LED display.
     * @param eyes choice of eyes
     */
    //% blockId=emote_showEyes
    //% block="show eyes as $eyes"
    //% weight=20
    export function showEyes(eyes: EYES) {
        switching = false
        showBitmap(allEyes[eyes], 0, 2)
    }

    /**
     * Show the selected mouth on the LED display.
     * @param mouth choice of mouth
     */
    //% blockId=emote_showMouth
    //% block="show mouth as $mouth"
    //% weight=10
    export function showMouth(mouth: MOUTHS) {
        switching = false
        showBitmap(allMouths[mouth], 2, 5)
    }

    /**
     * Show the selected face on the LED display.
     * @param eyes choice of eyes
     * @param mouth choice of mouth
     */
    //% blockId=emote_showFace
    //% block="show face with eyes= $eyes, mouth= $mouth"
    //% weight=30
    export function showFace(eyes: EYES, mouth: MOUTHS) {
        switching = false
        showBitmap(allEyes[eyes], 0, 2)
        showBitmap(allMouths[mouth], 2, 5)
    }

    /**
     * Start reacting in the chosen mood with an animated facial expression.
     * @param mood choice of mood
     */
    //% blockId=emote_newMood
    //% block="react as $mood"
    //% weight=50
    export function newMood(mood: MOODS) {
        // constrain using ENUMs to the currently defined values.
        // params are: basic eyes/mouth;  alternate eyes/mouth;  switch gap/time/multiple
        if (mood == MOODS.SNORING) {
            setMood(EYES.SHUT, MOUTHS.FLAT, EYES.SHUT, MOUTHS.OPEN, 2000, 2000, 0)
        } else if (mood == MOODS.ASLEEP) {
            setMood(EYES.SHUT, MOUTHS.FLAT, EYES.SHUT, MOUTHS.HMMM, 3000, 500, 0)
        } else if (mood == MOODS.NONE) {
            setMood(EYES.OPEN, MOUTHS.FLAT, EYES.SHUT, MOUTHS.FLAT, 600, 300, 2)
        } else if (mood == MOODS.HAPPY) {
            setMood(EYES.OPEN, MOUTHS.GRIN, EYES.WINK, MOUTHS.SMIRK, 1500, 400, 2)
        } else if (mood == MOODS.SAD) {
            setMood(EYES.SAD, MOUTHS.SULK, EYES.SHUT, MOUTHS.HMMM, 2000, 600, 1)
        } else if (mood == MOODS.ANGRY) {
            setMood(EYES.MAD, MOUTHS.HMMM, EYES.MAD, MOUTHS.SHOUT, 600, 800, 3)
        } else if (mood == MOODS.SURPRISED) {
            setMood(EYES.POP, MOUTHS.OPEN, EYES.OPEN, MOUTHS.OPEN, 1600, 400, 0)
        } else if (mood == MOODS.SHIVER) {
            setMood(EYES.LEFT, MOUTHS.RIGHT, EYES.RIGHT, MOUTHS.LEFT, 140, 140, 0)
        } else if (mood == MOODS.TICKLED) {
            setMood(EYES.OPEN, MOUTHS.OK, EYES.FLIP, MOUTHS.FLIP, 750, 250, 0)
        }
        if (mood == MOODS.DEAD) {
            basic.showIcon(IconNames.Skull)
        }
    }

    /**
     * Stop the current animated reaction.
     */
    //% blockId=emote_cease
    //% help=emote/cease
    //% block="stop reacting"
    //% weight=40
    export function cease() {
        switching = false
    }

    /*
    In most moods, we sporadically switch between two faces.
    So we may be blinking, snoring, shivering or laughing etc.
    Display of the alternate face is controlled by two time-periods: 
    "switchGap" governs how often; and "switchTime" says how long.
    A non-zero "switchVary" introduce some randomness, by extending 
    the gap by an unpredictable multiple.
    */
    function setMood(eyes: EYES, mouth: MOUTHS, otherEyes: EYES, otherMouth: MOUTHS, gap: number, time: number, vary: number) {
        switching = false
        mainEyes = eyes
        mainMouth = mouth
        altEyes = otherEyes
        altMouth = otherMouth

        switchGap = gap
        switchTime = time
        switchVary = vary
        switching = true
        showBitmap(allEyes[mainEyes], 0, 2)
        showBitmap(allMouths[mainMouth], 2, 5)
        control.inBackground(function () {
            while (switching) {
                showBitmap(allEyes[altEyes], 0, 2)
                showBitmap(allMouths[altMouth], 2, 5)
                pause(switchTime)
                showBitmap(allEyes[mainEyes], 0, 2)
                showBitmap(allMouths[mainMouth], 2, 5)
                pause(switchGap + randint(0, switchVary) * switchGap)
            }
        })
    }
    /* Use the bitmap to plot LEDs on/off in a subset of display-rows 
      (the top two for eyes; the bottom three for mouths).
      To optimise performance, bits are mapped low-endian and row-wise in
      groups of 5, (top-left pixel as the LSB; bottom-right pixels as the MSB). 
      So for a 2-row pair of eyes, the pixel contributions are:
                1   2   4   8  16
                32  64 128 256 512
    */
    function showBitmap(bitmap: number, start: number, stop: number) {
        for (let y = start; y < stop; y++) {
            for (let x = 0; x < 5; x++) {
                if (bitmap & 1) {
                    led.plot(x, y)
                } else {
                    led.unplot(x, y)
                }
                bitmap >>= 1
            }
        }
    }
}


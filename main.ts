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
    //% block="Tickle"
    TICKLE,
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

    //% block="show eyes as $eyes"
    //% weight=20
    export function showEyes(eyes: EYES) {
        switching = false
        showBitmap(allEyes[eyes], 0, 2)
    }

    //% block="show mouth as $mouth"
    //% weight=10
    export function showMouth(mouth: MOUTHS) {
        switching = false
        showBitmap(allMouths[mouth], 2, 5)
    }

    //% block="show face with eyes= $eyes, mouth= $mouth"
    //% weight=30
    export function emote(eyes: EYES, mouth: MOUTHS) {
        switching = false
        showBitmap(allEyes[eyes], 0, 2)
        showBitmap(allMouths[mouth], 2, 5)
    }

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
        } else if (mood == MOODS.TICKLE) {
            setMood(EYES.OPEN, MOUTHS.OK, EYES.FLIP, MOUTHS.FLIP, 750, 250, 0)
        }
        if (mood == MOODS.DEAD) {
            basic.showIcon(IconNames.Skull)
        }
    }

    //% block="stop reacting"
    //% weight=40
    export function cease() {
        switching = false
    }

    function setMood(eyes: EYES, mouth: MOUTHS, otherEyes: EYES, otherMouth: MOUTHS, gap: number, time: number, vary: number) {
        switching = false
        mainEyes = eyes
        mainMouth = mouth
        altEyes = otherEyes
        altMouth = otherMouth
        /*
        In most moods, we sporadically switch between two faces.
        So we may be blinking, snoring, shivering or laughing etc.
        These are controlled by two time-periods: "switchGap" governs how often, 
            and "switchTime" says how long, --to show the alternate face.
        A non-zero "switchVary" allows for extension of the gap
            by an unpredictable multiple.
        */
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
    
    function showBitmap(bitmap: number, start: number, stop: NumberFormat) {
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

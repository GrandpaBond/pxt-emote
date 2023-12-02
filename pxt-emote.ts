/**
 * an extension for making faces..
 */
//% color=#402080 weight=100 icon="\uf4da" block="Emote"
namespace emote {

    // CONSTANTS...    

    // ensure these constants match the enum orderings below!
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
    ];

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
    ];


    // ENUMS...

    // ensure these enums match the constant orderings above!
    enum Eyes {
        //% block="open"
        Open,
        //% block="sad"
        Sad,
        //% block="shut"
        Shut,
        //% block="mad"
        Mad,
        //% block="up"
        Up,
        //% block="pop"
        Pop,
        //% block="left"
        Left,
        //% block="Right"
        Right,
        //% block="wink"
        Wink,
        //% block="flip"
        Flip
    };

    enum Mouths {
        //% block="flat"
        Flat,
        //% block="ok"
        Ok,
        //% block="grin"
        Grin,
        //% block="sulk"
        Sulk,
        //% block="Hmmm"
        Hmmm,
        //% block="open"
        Open,
        //% block="left"
        Left,
        //% block="Right"
        Right,
        //% block="shout"
        Shout,
        //% block="laugh"
        Laugh,
        //% block="smirk"
        Smirk,
        //% block="kiss"
        Kiss,
        //% block="flip"
        Flip
    };

    enum Moods {
        //% block="none"
        None,
        //% block="happy"
        Happy,
        //% block="sad"
        Sad,
        //% block="angry"
        Angry,
        //% block="surprised"
        Surprised,
        //% block="asleep"
        Asleep,
        //% block="snoring"
        Snoring,
        //% block="shiver"
        Shiver,
        //% block="tickled"
        Tickled,
        //% block="dead"
        Dead
    };

    enum UpDown {
        //% block="up"
        Up,
        //% block="level"
        Level,
        //% block="down"
        Down
    };

    enum LeftRight {
        //% block="left"
        Left,
        //% block="ahead"
        Ahead,
        //% block="right"
        Right,
        //% block="inwards"
        Inwards,
        //% block="outwards"
        Outwards
    };

    // INITIALISE

    let mainEyes = 0;
    let mainMouth = 0;
    let altEyes = 0;
    let altMouth = 0;
    let switching = false;
    let switchGap = 0;
    let switchTime = 0;
    let switchVary = 0;

    /* Use a bitmap to plot LEDs on/off in a subset of display-rows 
      (the top two for eyes; the bottom three for mouths).
      To optimise performance, bits are mapped low-endian and row-wise in
      groups of 5, (top-left pixel as the LSB; bottom-Right pixels as the MSB). 
      So for a 2-row pair of eyes, the pixel contributions are:
                1   2   4   8  16
                32  64 128 256 512
    */
    function showBitmap(bitmap: number, rows: number, start: number) {
        for (let y = start; y < (start + rows); y++) {
            for (let x = 0; x < 5; x++) {
                if (bitmap & 1) {
                    led.plot(x, y);
                } else {
                    led.unplot(x, y);
                }
                bitmap >>= 1;
            }
        }
    }

    /*
    In most moods, we sporadically switch between two faces.
    So we may be blinking, snoring, shivering or laughing etc.
    Display of the alternate face is controlled by two time-periods: 
    "switchGap" governs how often; and "switchTime" says how long.
    A non-zero "switchVary" introduce some randomness, by extending 
    the gap by an unpredictable multiple.
    */

    function setMood(eyes: Eyes, mouth: Mouths, otherEyes: Eyes, otherMouth: Mouths,
        gap: number, time: number, vary: number) {
        switching = false;
        mainEyes = eyes;
        mainMouth = mouth;
        altEyes = otherEyes;
        altMouth = otherMouth;

        switchGap = gap;
        switchTime = time;
        switchVary = vary;
        switching = true;
        showBitmap(allEyes[mainEyes], 0, 2);
        showBitmap(allMouths[mainMouth], 2, 5);

        control.inBackground(function () { animate() });
    }

    function animate(): void {
        while (switching) {
            showBitmap(allEyes[altEyes], 2, 0);
            showBitmap(allMouths[altMouth], 3, 2);
            pause(switchTime);
            showBitmap(allEyes[mainEyes], 2, 0);
            showBitmap(allMouths[mainMouth], 3, 2);
            pause(switchGap + randint(0, switchVary) * switchGap);
        }
    }

    // EXPORTED USER INTERFACES  

    /**
     * Show the selected eyes on the LED display.
     * @param eyes choice of eyes
     */
    //% block="show eyes as $eyes"
    //% weight=20
    export function showEyes(eyes: Eyes) {
        switching = false;
        showBitmap(allEyes[eyes], 2, 0);
    }

    /**
     * Show the selected mouth on the LED display.
     * @param mouth choice of mouth
     */
    //% block="show mouth as $mouth"
    //% weight=10
    export function showMouth(mouth: Mouths) {
        switching = false;
        showBitmap(allMouths[mouth], 3, 2);
    }

    /**
     * Show the selected face on the LED display.
     * @param eyes choice of eyes
     * @param mouth choice of mouth
     */
    //% block="show face with eyes= $eyes, mouth= $mouth"
    //% weight=30
    export function showFace(eyes: Eyes, mouth: Mouths) {
        switching = false;
        showBitmap(allEyes[eyes], 2, 0);
        showBitmap(allMouths[mouth], 3, 2);
    }

    /**
     * Look in the chosen direction.
     * @param upDown vertical eye-position
     * @param leftRight horizontal eye-position
     */
    //% block="look $upDown $leftRight"
    //% weight=30
    export function look(upDown: UpDown, leftRight: LeftRight) {
        switching = false;
        let eyeMap = 0;
        // work out which pixel sets to combine
        switch (upDown) {
            case 0:
        }
    }


    /**
     * Start reacting in the chosen mood with an animated facial expression.
     * @param mood choice of mood
     */
    //% blockId=emote_newMood
    //% block="react as $mood"
    //% weight=50
    export function newMood(mood: Moods) {
        // constrain using ENUMs to the currently defined values.
        // params are: basic eyes/mouth;  alternate eyes/mouth;  switch gap/time/multiple
        if (mood == Moods.Snoring) {
            setMood(Eyes.Shut, Mouths.Flat, Eyes.Shut, Mouths.Open, 2000, 2000, 0);
        } else if (mood == Moods.Asleep) {
            setMood(Eyes.Shut, Mouths.Flat, Eyes.Shut, Mouths.Hmmm, 3000, 500, 0);
        } else if (mood == Moods.None) {
            setMood(Eyes.Open, Mouths.Flat, Eyes.Shut, Mouths.Flat, 600, 300, 2);
        } else if (mood == Moods.Happy) {
            setMood(Eyes.Open, Mouths.Grin, Eyes.Wink, Mouths.Smirk, 1500, 400, 2);
        } else if (mood == Moods.Sad) {
            setMood(Eyes.Sad, Mouths.Sulk, Eyes.Shut, Mouths.Hmmm, 2000, 600, 1);
        } else if (mood == Moods.Angry) {
            setMood(Eyes.Mad, Mouths.Hmmm, Eyes.Mad, Mouths.Shout, 600, 800, 3);
        } else if (mood == Moods.Surprised) {
            setMood(Eyes.Pop, Mouths.Open, Eyes.Open, Mouths.Open, 1600, 400, 0);
        } else if (mood == Moods.Shiver) {
            setMood(Eyes.Left, Mouths.Right, Eyes.Right, Mouths.Left, 140, 140, 0);
        } else if (mood == Moods.Tickled) {
            setMood(Eyes.Open, Mouths.Ok, Eyes.Flip, Mouths.Flip, 750, 250, 0);
        }
        if (mood == Moods.Dead) {
            basic.showIcon(IconNames.Skull);
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
        switching = false;
    }
}

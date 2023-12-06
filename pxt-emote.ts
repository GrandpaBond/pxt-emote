/**
 * an extension for making faces..
 */
//% color=#402080 weight=100 icon="\uf4da" block="Emote"
namespace emote {
    // CONSTANTS...    

    // eye pixels use these pixel-map contributions
    //    ( 1   2)   4  ( 8  16 )
    //    (32  64) 128  (256 512)
    // Left-eye maps  -- for right-eye use {map} << 3
    //                -- or use bothEyes({left},{right})
    enum Eye {
        Up = 1 + 2,
        Down = 32 + 64,
        Left = 1 + 32,
        Right = 2 + 64,
        All = 1 + 2 + 32 + 64
    }

// UI ENUMS
    export enum Eyes {
        //% block="open"
        Open = bothEyes(Eye.All, Eye.All),
        //% block="sad"
        Sad = bothEyes(Eye.Down | Eye.Right, Eye.Down | Eye.Left),
        //% block="shut"
        Shut = bothEyes(Eye.Down, Eye.Down),
        //% block="mad"
        Mad = bothEyes(Eye.Up | Eye.Right, Eye.Up | Eye.Left),
        //% block="up"
        Up = bothEyes(Eye.Up, Eye.Up),
        //% block="pop"
        Pop = bothEyes(Eye.Left, Eye.Right),
        //% block="left"
        Left = bothEyes(Eye.Left, Eye.Left),
        //% block="right"
        Right = bothEyes(Eye.Right, Eye.Right),
        //% block="wink"
        Wink = bothEyes(Eye.Down, Eye.All),
        //% block="flip"
        Flip = 324 // (=OK mouth, but upside-down)
    };

    export enum Mouth {
        //% block="flat"
        Flat = 448,
        //% block="ok"
        Ok = 4416,
        //% block="grin"
        Grin = 14880,
        //% block="sulk"
        Sulk = 17856,
        //% block="Hmmm"
        Hmmm = 14464,
        //% block="open"
        Open = 4420,
        //% block="left"
        Left = 6240,
        //% block="right"
        Right = 13056,
        //% block="shout"
        Shout = 14660,
        //% block="laugh"
        Laugh = 15204,
        //% block="smirk"
        Smirk = 6944,
        //% block="kiss"
        Kiss = 128,
        //% block="flip"
        Flip = 28512 // (=open eyes, but upside-down)
    };

    export enum Moods {
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
        //% block="scornful"
        Scornful,
        //% block="dead"
        Dead
    };

    export enum EyesV {
        //% block="up"
        Up,
        //% block="level"
        Level,
        //% block="down"
        Down
    };

    export enum EyesH {
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

    export enum Spin {
        //% block="clockwise"
        Screw,
        //% block="anti-clockwise"
        Unscrew
    };

    enum Glances {

    };



// a Face is an expression
    class Face {
        leftEye: number;
        rightEye: number;
        mouth: number;

        constructor(leftEye: Eye, 
                    rightEye: Eye,
                    mouth: Mouth) {
            this.leftEye = leftEye;
            this.rightEye = rightEye << 3;
            this.mouth = mouth;
        }

        show() {
            while (busy) pause(20);
            showFace(bothEyes(this.leftEye, this.rightEye), this.mouth);
        }
    }
/* a Mood shows a main expression, and a periodic reaction
whwn blinking, snoring, shivering or laughing etc...
Display of the reaction face is controlled by two time-periods:
"switchGap" governs how often; and "switchTime" says how long.

A non-zero "switchVary" introduce some randomness, by extending
the gap by an unpredictable multiple.
*/
    class Mood {
        expression: Face; // main Face
        switchGap: number;  // average ms between reactions
        varyGap: number;    // % random variation in switchGap
        reaction: Face; // reactive Face
        switchTime: number; // average ms for reaction
        varyTime: number;   // % random variation in switchTime

        constructor(expression: Face, switchGap: number, varyGap: number,
                    reaction: Face, switchTime: number, varyTime: number,
                    blinkRate: number) {
            this.expression = expression;
            this.switchGap = switchGap;
            this.varyGap = varyGap;
            this.reaction = reaction;
            this.switchTime = switchTime;
            this.varyTime = varyTime;
            this.blinkRate = blinkRate;
        }
    // adopt this Mood
    // 
        display() {
            
        }
    }
    function bothEyes(left: Eye, right: Eye): number {
        return (left + (right << 3))
    }

      /* Use a bitmap to plot LEDs on/off in a subset of display-rows 
      (the top two for eyes; the bottom three for mouths).
      To optimise performance, bits are mapped low-endian and row-wise in
      groups of 5, (top-left pixel as the LSB; bottom-Right pixels as the MSB). 
      So for a 2-row pair of eyes, the pixel contributions are:
                1   2   4   8  16
                32  64 128 256 512
    */
    function showBitmap(bitmap: number, rows: number, start: number) {
        busy = true;
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
        busy = false;
    }



    function setMood(eyes: Eyes, mouth: Mouths, otherEyes: Eyes, otherMouth: Mouths,
        gap: number, time: number, vary: number) {
        canReact = false;
        mainEyes = eyes;
        mainMouth = mouth;
        altEyes = otherEyes;
        altMouth = otherMouth;

        switchGap = gap;
        switchTime = time;
        switchVary = vary;
        canReact = true;
        showBitmap(allEyes[mainEyes], 0, 2);
        showBitmap(allMouths[mainMouth], 2, 5);

        control.inBackground(function () { animate() });
    }
// background animation handles repeated periodic reactions reflecting Moods
    function animate(): void {
        while (canReact) {
            showBitmap(myMood, 2, 0);
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
        canReact = false;
        showBitmap(allEyes[eyes], 2, 0);
    }

    /**
     * Show the selected mouth on the LED display.
     * @param mouth choice of mouth
     */
    //% block="show mouth as $mouth"
    //% weight=10
    export function showMouth(mouth: Mouths) {
        canReact = false;
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
        canReact = false;
        showBitmap(allEyes[eyes], 2, 0);
        showBitmap(allMouths[mouth], 3, 2);
    }


    /**
     * Look in the chosen direction.
     * @param upDown vertical eye-position
     * @param leftRight horizontal eye-position
     */
    //% block="look $upDown $leftRight|| for $ms ms"
    //% inlineInputMode=inline
    //% expandableArgumentMode="enabled"
    //% weight=30
    export function look(upDown: EyesV, leftRight: EyesH, ms = 0) {
        canReact = false;
        let eyeMap = 0;
        if ((upDown == EyesV.Level) && (leftRight == EyesH.Ahead)) {
            eyeMap = eyeAll + (eyeAll << 3);
        } else {
            switch (upDown) {
                case EyesV.Up: eyeMap = eyeUp + (eyeUp << 3);
                    break;
                case EyesV.Level:
                    break;
                case EyesV.Down: eyeMap = eyeDown + (eyeDown << 3);
                    break;
            }
            switch (leftRight) {
                case EyesH.Left:
                    eyeMap |= eyeLeft + (eyeLeft << 3);
                    break;
                case EyesH.Ahead:
                    break;
                case EyesH.Right:
                    eyeMap |= eyeRight + (eyeRight << 3);
                    break;
                case EyesH.Inwards:
                    eyeMap |= eyeRight + (eyeLeft << 3);
                    break;
                case EyesH.Outwards:
                    eyeMap |= eyeLeft + (eyeRight << 3);
                    break;
            }
        }
        showBitmap(eyeMap, 2, 0);
    }

    /**
     * Start reacting in the chosen mood, with an animated facial expression.
     * @param mood choice of mood
     */
    //% blockId=emote_newMood
    //% block="react as $mood"
    //% weight=50
    export function newMood(mood: Moods) {
        // constrain using ENUMs to the currently defined values.
        // params are: basic eyes/mouth;  alternate eyes/mouth;  switch gap/time/multiple
        switch (mood) {
            case Moods.Snoring:
                setMood(Eyes.Shut, Mouths.Flat, Eyes.Shut, Mouths.Open, 2000, 2000, 0);
                break;
            case Moods.Asleep:
                setMood(Eyes.Shut, Mouths.Flat, Eyes.Shut, Mouths.Hmmm, 3000, 500, 0);
                break;
            case Moods.None:
                setMood(Eyes.Open, Mouths.Flat, Eyes.Shut, Mouths.Flat, 600, 300, 2);
                break;
            case Moods.Happy:
                setMood(Eyes.Open, Mouths.Grin, Eyes.Wink, Mouths.Smirk, 1500, 400, 2);
                break;
            case Moods.Sad:
                setMood(Eyes.Sad, Mouths.Sulk, Eyes.Shut, Mouths.Hmmm, 2000, 600, 1);
                break;
            case Moods.Angry:
                setMood(Eyes.Mad, Mouths.Hmmm, Eyes.Mad, Mouths.Shout, 600, 800, 3);
                break;
            case Moods.Surprised:
                setMood(Eyes.Pop, Mouths.Open, Eyes.Open, Mouths.Open, 1600, 400, 0);
                break;
            case Moods.Shiver:
                setMood(Eyes.Left, Mouths.Right, Eyes.Right, Mouths.Left, 140, 140, 0);
                break;
            case Moods.Tickled:
                setMood(Eyes.Open, Mouths.Ok, Eyes.Flip, Mouths.Flip, 750, 250, 0);
                break;
            case Moods.Dead:
                basic.showIcon(IconNames.Skull);
                break;
        }
    }

    /**
     * Roll the eyes in either direction.
     */
    //% block="roll eyes %dir"
    //% weight=40
    export function rollEyes(spin:Spin) {
        if (spin == Spin.Screw) {
            look(EyesV.Up, EyesH.Left);
            look(EyesV.Up, EyesH.Ahead);
            look(EyesV.Up, EyesH.Right);
            look(EyesV.Level, EyesH.Right);
            look(EyesV.Down, EyesH.Right);
            look(EyesV.Down, EyesH.Ahead);
            look(EyesV.Down, EyesH.Left);
            look(EyesV.Level, EyesH.Left);
        } else {
            look(EyesV.Level, EyesH.Left);
            look(EyesV.Down, EyesH.Left);
            look(EyesV.Down, EyesH.Ahead);
            look(EyesV.Down, EyesH.Right);
            look(EyesV.Level, EyesH.Right);
            look(EyesV.Up, EyesH.Right);
            look(EyesV.Up, EyesH.Ahead);
            look(EyesV.Up, EyesH.Left);
        }
    }

    /**
     * Stop the current animated reaction.
     */
    //% block="stop reacting"
    //% weight=40
    export function cease() {
        canReact = false;
    }
}

 // INITIALISE
    let moods: Mood[] = initialiseMoods();
    let myMood = moods[Moods.None];
    //let mainFace: Face = new Face(eyeAll, eyeAll, allMouths[0]);
    let canReact = false;
    let reacting = false;
    let busy = false;

 
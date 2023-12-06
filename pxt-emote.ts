/**
 * an extension for making faces..
 */
//% color=#402080 weight=100 icon="\uf4da" block="Emote"
namespace emote {
    // CONSTANTS & ENUMS...    
    // eyes use these pixel-map contributions
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

// USER INTERFACE DROP-Down ENUMS
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
        Wink = bothEyes(Eye.Down, Eye.All)
        /*
        //% block="flip"
        Flip = 324 // (=OK mouth, but upside-down)
        */
    };
    // mouth uses these pixel-map contributions
    //       1    2    4   8   16  
    //      32   64  128  256  512 
    //      1K   2K   4K   8K  16K  
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
        Kiss = 128
        /*
        //% block="flip"
        Flip = 28512 // (=open eyes, but upside-down)
        */
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
    const MOODCOUNT = Moods.Dead + 1;

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

// a Face is an expression having two eyes and a mouth
    class Face {
        leftEye: Eye;
        rightEye: Eye;
        mouth: Mouth;

        constructor(leftEye: Eye, 
                    rightEye: Eye,
                    mouth: Mouth) {
            this.leftEye = leftEye;
            this.rightEye = rightEye;
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
    
    // the Mood object holds all the information we need to share with the background animate() 
        canReact = true;
        //showBitmap(mainEyes, 0, 2);
        //showBitmap(mainMouth, 2, 5);

        control.inBackground(function () { animate() });
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

// background animation handles repeated periodic reactions reflecting Moods
    function animate(): void {
        while (canReact) {
            showBitmap(myMood, 2, 0);
            showBitmap(altMouth, 3, 2);
            pause(switchTime);
            showBitmap(mainEyes, 2, 0);
            showBitmap(mainMouth, 3, 2);
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
        showBitmap(eyes, 2, 0);
    }

    /**
     * Show the selected mouth on the LED display.
     * @param mouth choice of mouth
     */
    //% block="show mouth as $mouth"
    //% weight=10
    export function showMouth(mouth: Mouth) {
        canReact = false;
        showBitmap(mouth, 3, 2);
    }

    /**
     * Show the selected face on the LED display.
     * @param eyes choice of eyes
     * @param mouth choice of mouth
     */
    //% block="show face with eyes= $eyes, mouth= $mouth"
    //% weight=30
    export function showFace(eyes: Eyes, mouth: Mouth) {
        canReact = false;
        showBitmap(eyes, 2, 0);
        showBitmap(mouth, 3, 2);
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
    
    //% block="become $mood"
    //% weight=50

    export function newMood(mood: Moods) {
        myMood = allMoods[mood];
    }
    


    function initMoods(): Mood[] {
        let all = Mood[MOODCOUNT];
        // params are: basic eyes/mouth;  alternate eyes/mouth;  switch gap/time/multiple
        all[Moods.None] = new Mood(Eyes.Open, Mouth.Flat, Eyes.Shut, Mouth.Flat, 600, 300, 2);
        all[Moods.Happy] = new Mood(Eyes.Open, Mouth.Grin, Eyes.Wink, Mouth.Smirk, 1500, 400, 2);
        all[Moods.Sad] = new Mood(Eyes.Sad, Mouth.Sulk, Eyes.Shut, Mouth.Hmmm, 2000, 600, 1);
        all[Moods.Angry] = new Mood(Eyes.Mad, Mouth.Hmmm, Eyes.Mad, Mouth.Shout, 600, 800, 3);
        all[Moods.Surprised] = new Mood(Eyes.Pop, Mouth.Open, Eyes.Open, Mouth.Open, 1600, 400, 0);
        all[Moods.Asleep] = new Mood(Eyes.Shut, Mouth.Flat, Eyes.Shut, Mouth.Hmmm, 3000, 500, 0);
        all[Moods.Snoring] = new Mood(Eyes.Shut, Mouth.Flat, Eyes.Shut, Mouth.Open, 2000, 2000, 0);
        all[Moods.Shiver] = new Mood(Eyes.Left, Mouth.Right, Eyes.Right, Mouth.Left, 140, 140, 0);
        all[Moods.Tickled] = new Mood(Eyes.Open, Mouth.Ok, Eyes.Flip, Mouth.Flip, 750, 250, 0);
        all[Moods.Scornful] = new Mood(Eyes.Open, Mouth.Ok, Eyes.Flip, Mouth.Flip, 750, 250, 0);
        all[Moods.Dead] = basic.showIcon(IconNames.Skull);
        return (all);
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


 // INITIALISE
    let allMoods: Mood[] = initMoods();
    let myMood = moods[Moods.None];
    let mainFace = new Face(Eye.All, Eye.All, Mouth.Flat);
    let canReact = false;
    let reacting = false;
    let busy = false;
    let litMap = 0;
}

 
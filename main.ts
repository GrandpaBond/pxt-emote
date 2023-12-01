function next_mouth () {
    if (flipped) {
        emote.showEyes(EYES.OPEN)
        flipped = false
    }
    if (mouth == 0) {
        emote.showMouth(MOUTHS.FLAT)
    } else if (mouth == 1) {
        emote.showMouth(MOUTHS.OK)
    } else if (mouth == 2) {
        emote.showMouth(MOUTHS.GRIN)
    } else if (mouth == 3) {
        emote.showMouth(MOUTHS.SULK)
    } else if (mouth == 4) {
        emote.showMouth(MOUTHS.HMMM)
    } else if (mouth == 5) {
        emote.showMouth(MOUTHS.OPEN)
    } else if (mouth == 6) {
        emote.showMouth(MOUTHS.LEFT)
    } else if (mouth == 7) {
        emote.showMouth(MOUTHS.RIGHT)
    } else if (mouth == 8) {
        emote.showMouth(MOUTHS.SHOUT)
    } else if (mouth == 9) {
        emote.showMouth(MOUTHS.LAUGH)
    } else if (mouth == 10) {
        emote.showMouth(MOUTHS.KISS)
    } else if (mouth == 11) {
        emote.showMouth(MOUTHS.SMIRK)
    } else if (mouth == 12) {
        emote.showEyes(EYES.FLIP)
        emote.showMouth(MOUTHS.FLIP)
        flipped = true
        mouth = -1
    }
    mouth += 1
}
// tests go here; this will not be compiled when this package is used as an extension.
input.onButtonPressed(Button.A, function () {
    while (input.buttonIsPressed(Button.A)) {
        basic.pause(100)
    }
    next_eyes()
})
function next_eyes () {
    if (flipped) {
        emote.showMouth(MOUTHS.FLAT)
        flipped = false
    }
    if (eyes == 0) {
        emote.showEyes(EYES.OPEN)
    } else if (eyes == 1) {
        emote.showEyes(EYES.SAD)
    } else if (eyes == 2) {
        emote.showEyes(EYES.SHUT)
    } else if (eyes == 3) {
        emote.showEyes(EYES.MAD)
    } else if (eyes == 4) {
        emote.showEyes(EYES.UP)
    } else if (eyes == 5) {
        emote.showEyes(EYES.POP)
    } else if (eyes == 6) {
        emote.showEyes(EYES.LEFT)
    } else if (eyes == 7) {
        emote.showEyes(EYES.RIGHT)
    } else if (eyes == 8) {
        emote.showEyes(EYES.WINK)
    } else if (eyes == 9) {
        emote.showEyes(EYES.FLIP)
        emote.showMouth(MOUTHS.FLIP)
        flipped = true
        eyes = -1
    }
    eyes += 1
}
function nextMood () {
    if (mood == 0) {
        emote.newMood(MOODS.NONE)
    } else if (mood == 1) {
        emote.newMood(MOODS.HAPPY)
    } else if (mood == 2) {
        emote.newMood(MOODS.SAD)
    } else if (mood == 3) {
        emote.newMood(MOODS.ANGRY)
    } else if (mood == 4) {
        emote.newMood(MOODS.SURPRISED)
    } else if (mood == 5) {
        emote.newMood(MOODS.ASLEEP)
    } else if (mood == 6) {
        emote.newMood(MOODS.SNORING)
    } else if (mood == 7) {
        emote.newMood(MOODS.SHIVER)
    } else if (mood == 8) {
        emote.newMood(MOODS.TICKLED)
    } else if (mood == 9) {
        emote.newMood(MOODS.DEAD)
        mood = -1
    }
    basic.pause(10000)
    emote.cease()
    basic.pause(1000)
    reset()
    mood += 1
}
input.onButtonPressed(Button.AB, function () {
    while (input.buttonIsPressed(Button.AB)) {
        basic.pause(100)
    }
    nextMood()
})
input.onButtonPressed(Button.B, function () {
    while (input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
    next_mouth()
})
function reset () {
    eyes = 0
    mouth = 0
    flipped = true
    basic.showLeds(`
        . # . . .
        # # . . .
        . # . # .
        . . . # #
        . . . # .
        `)
}
let eyes = 0
let mouth = 0
let flipped = false
let mood = 0
reset()
mood = 0

// tests go here; this will not be compiled when this package is used as an extension.
input.onButtonPressed(Button.A, function () {
    while (input.buttonIsPressed(Button.A)) {
        basic.pause(100)
    }
    next_eyes()
})
input.onButtonPressed(Button.AB, function () {
    while (input.buttonIsPressed(Button.AB)) {
        basic.pause(100)
    }
    next_mood()
})
input.onButtonPressed(Button.B, function () {
    while (input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
    next_mouth()
})
function next_eyes() {
    if (flipped) {
        Emote.show_mouth(MOUTHS.FLAT)
        flipped = false
    }
    if (eyes == 0) {
        Emote.show_eyes(EYES.OPEN)
    } else if (eyes == 1) {
        Emote.show_eyes(EYES.SAD)
    } else if (eyes == 2) {
        Emote.show_eyes(EYES.SHUT)
    } else if (eyes == 3) {
        Emote.show_eyes(EYES.MAD)
    } else if (eyes == 4) {
        Emote.show_eyes(EYES.UP)
    } else if (eyes == 5) {
        Emote.show_eyes(EYES.POP)
    } else if (eyes == 6) {
        Emote.show_eyes(EYES.LEFT)
    } else if (eyes == 7) {
        Emote.show_eyes(EYES.RIGHT)
    } else if (eyes == 8) {
        Emote.show_eyes(EYES.WINK)
    } else if (eyes == 9) {
        Emote.show_eyes(EYES.FLIP)
        Emote.show_mouth(MOUTHS.FLIP)
        flipped = true
        eyes = -1
    }
    eyes += 1
}
function next_mouth() {
    if (flipped) {
        Emote.show_eyes(EYES.OPEN)
        flipped = false
    }
    if (mouth == 0) {
        Emote.show_mouth(MOUTHS.FLAT)
    } else if (mouth == 1) {
        Emote.show_mouth(MOUTHS.OK)
    } else if (mouth == 2) {
        Emote.show_mouth(MOUTHS.GRIN)
    } else if (mouth == 3) {
        Emote.show_mouth(MOUTHS.SULK)
    } else if (mouth == 4) {
        Emote.show_mouth(MOUTHS.HMMM)
    } else if (mouth == 5) {
        Emote.show_mouth(MOUTHS.OPEN)
    } else if (mouth == 6) {
        Emote.show_mouth(MOUTHS.LEFT)
    } else if (mouth == 7) {
        Emote.show_mouth(MOUTHS.RIGHT)
    } else if (mouth == 8) {
        Emote.show_mouth(MOUTHS.SHOUT)
    } else if (mouth == 9) {
        Emote.show_mouth(MOUTHS.LAUGH)
    } else if (mouth == 10) {
        Emote.show_mouth(MOUTHS.KISS)
    } else if (mouth == 11) {
        Emote.show_mouth(MOUTHS.SMIRK)
    } else if (mouth == 12) {
        Emote.show_eyes(EYES.FLIP)
        Emote.show_mouth(MOUTHS.FLIP)
        flipped = true
        mouth = -1
    }
    mouth += 1
}
function next_mood() {
    if (mood == 0) {
        Emote.new_mood(MOODS.NONE)
    } else if (mood == 1) {
        Emote.new_mood(MOODS.HAPPY)
    } else if (mood == 2) {
        Emote.new_mood(MOODS.SAD)
    } else if (mood == 3) {
        Emote.new_mood(MOODS.ANGRY)
    } else if (mood == 4) {
        Emote.new_mood(MOODS.SURPRISED)
    } else if (mood == 5) {
        Emote.new_mood(MOODS.ASLEEP)
    } else if (mood == 6) {
        Emote.new_mood(MOODS.SNORING)
    } else if (mood == 7) {
        Emote.new_mood(MOODS.SHIVER)
    } else if (mood == 8) {
        Emote.new_mood(MOODS.TICKLE)
    } else if (mood == 9) {
        Emote.new_mood(MOODS.DEAD)
        mood = -1
    }
    basic.pause(10000)
    Emote.cease()
    basic.pause(1000)
    reset()
    mood += 1
}
function reset() {
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
let mouth = 0
let eyes = 0
let flipped = false
let mood = 0
reset()
mood = 0

input.onPinPressed(TouchPin.P0, function () {
    emote.showMouth(emote.Mouths.Sulk)
    rollEyes()
})
function glance () {
    emote.showMouth(emote.Mouths.Flat)
    dir = (dir + 1) % 16
    if (dir == 0) {
        emote.look(emote.EyesV.Up, emote.EyesH.Left)
    } else if (dir == 1) {
        emote.look(emote.EyesV.Level, emote.EyesH.Left)
    } else if (dir == 2) {
        emote.look(emote.EyesV.Down, emote.EyesH.Left)
    } else if (dir == 3) {
        emote.look(emote.EyesV.Up, emote.EyesH.Ahead)
    } else if (dir == 4) {
        emote.look(emote.EyesV.Level, emote.EyesH.Ahead)
    } else if (dir == 5) {
        emote.look(emote.EyesV.Down, emote.EyesH.Ahead)
    } else if (dir == 6) {
        emote.look(emote.EyesV.Up, emote.EyesH.Right)
    } else if (dir == 7) {
        emote.look(emote.EyesV.Level, emote.EyesH.Right)
    } else if (dir == 8) {
        emote.look(emote.EyesV.Down, emote.EyesH.Right)
    } else if (dir == 9) {
        emote.look(emote.EyesV.Up, emote.EyesH.Inwards)
    } else if (dir == 10) {
        emote.look(emote.EyesV.Level, emote.EyesH.Inwards)
    } else if (dir == 11) {
        emote.look(emote.EyesV.Down, emote.EyesH.Inwards)
    } else if (dir == 12) {
        emote.look(emote.EyesV.Up, emote.EyesH.Outwards)
    } else if (dir == 13) {
        emote.look(emote.EyesV.Level, emote.EyesH.Outwards)
    } else if (dir == 14) {
        emote.look(emote.EyesV.Down, emote.EyesH.Outwards)
    } else {
        basic.clearScreen()
    }
}
function next_mouth () {
    if (flipped) {
        emote.showEyes(emote.Eyes.Open)
        flipped = false
    }
    if (mouth == 0) {
        emote.showMouth(emote.Mouths.Flat)
    } else if (mouth == 1) {
        emote.showMouth(emote.Mouths.Ok)
    } else if (mouth == 2) {
        emote.showMouth(emote.Mouths.Grin)
    } else if (mouth == 3) {
        emote.showMouth(emote.Mouths.Sulk)
    } else if (mouth == 4) {
        emote.showMouth(emote.Mouths.Hmmm)
    } else if (mouth == 5) {
        emote.showMouth(emote.Mouths.Open)
    } else if (mouth == 6) {
        emote.showMouth(emote.Mouths.Left)
    } else if (mouth == 7) {
        emote.showMouth(emote.Mouths.Right)
    } else if (mouth == 8) {
        emote.showMouth(emote.Mouths.Shout)
    } else if (mouth == 9) {
        emote.showMouth(emote.Mouths.Laugh)
    } else if (mouth == 10) {
        emote.showMouth(emote.Mouths.Kiss)
    } else if (mouth == 11) {
        emote.showMouth(emote.Mouths.Smirk)
    } else if (mouth == 12) {
        emote.showEyes(emote.Eyes.Flip)
        emote.showMouth(emote.Mouths.Flip)
        flipped = true
        mouth = -1
    }
    mouth += 1
}
function rollEyes () {
    emote.look(emote.EyesV.Up, emote.EyesH.Left)
    basic.pause(200)
    emote.look(emote.EyesV.Up, emote.EyesH.Ahead)
    basic.pause(200)
    emote.look(emote.EyesV.Up, emote.EyesH.Right)
    basic.pause(200)
    emote.look(emote.EyesV.Level, emote.EyesH.Right)
    basic.pause(200)
    emote.look(emote.EyesV.Down, emote.EyesH.Right)
    basic.pause(200)
    emote.look(emote.EyesV.Down, emote.EyesH.Ahead)
    basic.pause(200)
    emote.look(emote.EyesV.Down, emote.EyesH.Left)
    basic.pause(200)
    emote.look(emote.EyesV.Level, emote.EyesH.Left)
    basic.pause(200)
    emote.look(emote.EyesV.Up, emote.EyesH.Left)
    basic.pause(200)
    emote.look(emote.EyesV.Up, emote.EyesH.Ahead)
    basic.pause(200)
    emote.look(emote.EyesV.Up, emote.EyesH.Right)
    basic.pause(200)
    emote.look(emote.EyesV.Level, emote.EyesH.Right)
    basic.pause(200)
    emote.look(emote.EyesV.Down, emote.EyesH.Right)
    basic.pause(200)
    emote.look(emote.EyesV.Down, emote.EyesH.Ahead)
    basic.pause(200)
    emote.look(emote.EyesV.Down, emote.EyesH.Left)
    basic.pause(200)
    emote.look(emote.EyesV.Level, emote.EyesH.Left)
    basic.pause(200)
    emote.look(emote.EyesV.Level, emote.EyesH.Ahead)
}
input.onButtonPressed(Button.A, function () {
    while (input.buttonIsPressed(Button.A)) {
        basic.pause(100)
    }
    next_eyes()
})
function next_eyes () {
    if (flipped) {
        emote.showMouth(emote.Mouths.Ok)
        flipped = false
    }
    if (eyes == 0) {
        emote.showEyes(emote.Eyes.Open)
    } else if (eyes == 1) {
        emote.showEyes(emote.Eyes.Sad)
    } else if (eyes == 2) {
        emote.showEyes(emote.Eyes.Shut)
    } else if (eyes == 3) {
        emote.showEyes(emote.Eyes.Mad)
    } else if (eyes == 4) {
        emote.showEyes(emote.Eyes.Up)
    } else if (eyes == 5) {
        emote.showEyes(emote.Eyes.Pop)
    } else if (eyes == 6) {
        emote.showEyes(emote.Eyes.Left)
    } else if (eyes == 7) {
        emote.showEyes(emote.Eyes.Right)
    } else if (eyes == 8) {
        emote.showEyes(emote.Eyes.Wink)
    } else if (eyes == 9) {
        emote.showEyes(emote.Eyes.Flip)
        emote.showMouth(emote.Mouths.Flip)
        flipped = true
        eyes = -1
    }
    eyes += 1
}
function nextMood () {
    if (mood == 0) {
        emote.newMood(emote.Moods.None)
    } else if (mood == 1) {
        emote.newMood(emote.Moods.Happy)
    } else if (mood == 2) {
        emote.newMood(emote.Moods.Sad)
    } else if (mood == 3) {
        emote.newMood(emote.Moods.Snoring)
    } else if (mood == 4) {
        emote.newMood(emote.Moods.Surprised)
    } else if (mood == 5) {
        emote.newMood(emote.Moods.Asleep)
    } else if (mood == 6) {
        emote.newMood(emote.Moods.Snoring)
    } else if (mood == 7) {
        emote.newMood(emote.Moods.Shiver)
    } else if (mood == 8) {
        emote.newMood(emote.Moods.Tickled)
    } else if (mood == 9) {
        emote.newMood(emote.Moods.Dead)
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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    glance()
})
function reset () {
    dir = 0
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
let dir = 0
let mood = 0
reset()
mood = 0

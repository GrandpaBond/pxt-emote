function next_mouth () {
    if (flipped) {
        emote.showEyes(emote.Eyes.Open);
        flipped = false;
    }
    if (mouth == 0) {
        emote.showMouth(emote.Mouths.Flat);
    } else if (mouth == 1) {
        emote.showMouth(emote.Mouths.Ok);
    } else if (mouth == 2) {
        emote.showMouth(emote.Mouths.Grin);
    } else if (mouth == 3) {
        emote.showMouth(emote.Mouths.Sulk);
    } else if (mouth == 4) {
        emote.showMouth(emote.Mouths.Hmmm);
    } else if (mouth == 5) {
        emote.showMouth(emote.Mouths.Open);
    } else if (mouth == 6) {
        emote.showMouth(emote.Mouths.Left);
    } else if (mouth == 7) {
        emote.showMouth(emote.Mouths.Right);
    } else if (mouth == 8) {
        emote.showMouth(emote.Mouths.Shout);
    } else if (mouth == 9) {
        emote.showMouth(emote.Mouths.Laugh);
    } else if (mouth == 10) {
        emote.showMouth(emote.Mouths.Kiss);
    } else if (mouth == 11) {
        emote.showMouth(emote.Mouths.Smirk);
    } else if (mouth == 12) {
        emote.showEyes(emote.Eyes.Flip);
        emote.showMouth(emote.Mouths.Flip);
        flipped = true;
        mouth = -1;
    }
    mouth += 1;
}
// tests go here; this will not be compiled when this package is used as an extension.
input.onButtonPressed(Button.A, function () {
    while (input.buttonIsPressed(Button.A)) {
        basic.pause(100);
    }
    next_emote.Eyes();
})
function next_eyes () {
    if (flipped) {
        emote.showMouth(emote.Mouths.Ok)
        flipped = false;
    }
    if (emote.Eyes == 0) {
        emote.showEyes(emote.Eyes.Open);
    } else if (emote.Eyes == 1) {
        emote.showEyes(emote.Eyes.Sad);
    } else if (emote.Eyes == 2) {
        emote.showEyes(emote.Eyes.Shut);
    } else if (emote.Eyes == 3) {
        emote.showEyes(emote.Eyes.Mad);
    } else if (emote.Eyes == 4) {
        emote.showEyes(emote.Eyes.Up);
    } else if (emote.Eyes == 5) {
        emote.showEyes(emote.Eyes.Pop);
    } else if (emote.Eyes == 6) {
        emote.showEyes(emote.Eyes.Left);
    } else if (emote.Eyes == 7) {
        emote.showEyes(emote.Eyes.Right);
    } else if (emote.Eyes == 8) {
        emote.showEyes(emote.Eyes.Wink);
    } else if (emote.Eyes == 9) {
        emote.showEyes(emote.Eyes.Flip);
        emote.showMouth(emote.Mouths.Flip);
        flipped = true;
        emote.Eyes = -1;
    }
    emote.Eyes += 1;
}
function nextMood () {
    if (mood == 0) {
        emote.newMood(emote.Moods.None);
    } else if (mood == 1) {
        emote.newMood(emote.Moods.Happy);
    } else if (mood == 2) {
        emote.newMood(emote.Moods.Sad);
    } else if (mood == 3) {
        emote.newMood(emote.Moods.Snoring);
    } else if (mood == 4) {
        emote.newMood(emote.Moods.Surprised);
    } else if (mood == 5) {
        emote.newMood(emote.Moods.Asleep);
    } else if (mood == 6) {
        emote.newMood(emote.Moods.Snoring);
    } else if (mood == 7) {
        emote.newMood(emote.Moods.Shiver);
    } else if (mood == 8) {
        emote.newMood(emote.Moods.Tickled);
    } else if (mood == 9) {
        emote.newMood(emote.Moods.Dead);
        mood = -1;
    }
    basic.pause(10000);
    emote.cease();
    basic.pause(1000);
    reset();
    mood += 1;
}
input.onButtonPressed(Button.AB, function () {
    while (input.buttonIsPressed(Button.AB)) {
        basic.pause(100);
    }
    nextMood();
})
input.onButtonPressed(Button.B, function () {
    while (input.buttonIsPressed(Button.B)) {
        basic.pause(100);
    }
    next_mouth();
})
function reset () {
    emote.Eyes = 0;
    mouth = 0;
    flipped = true;
    basic.showLeds(`
        . # . . .
        # # . . .
        . # . # .
        . . . # #
        . . . # .
        `);
}
let eyyes = 0;
let mouth = 0;
let flipped = false;
let mood = 0;
reset();
mood = 0;

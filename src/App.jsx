import { useState, useEffect } from "react";

const SUPABASE_URL = "https://aedhhhnsfspodmbxcedy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZGhoaG5zZnNwb2RtYnhjZWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NDQxMzcsImV4cCI6MjA4NzQyMDEzN30.7izgMmHeGYd4-aPMjocvNz8ubBXHgWZVlbmksi9QqYY";

async function fetchWarriorData() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/public_crisis_data?select=*&order=submitted_at.asc&warrior_id=neq.test_one`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  const rows = await res.json();
  return rows.map(r => ({
    id: r.submission_id,
    warriorId: r.warrior_id || "",
    submitted: r.submitted_at ? r.submitted_at.slice(0,10) : "",
    crisisStart: r.crisis_start || "",
    ongoing: r.ongoing === true || r.ongoing === "Yes, still ongoing",
    pain: Number(r.pain_level) || 0,
    painCompared: r.pain_compared || "",
    painLocations: r.pain_locations ? r.pain_locations.split(" | ").filter(Boolean) : [],
    triggered: r.triggered_by ? r.triggered_by.split(" | ").filter(Boolean) : [],
    primaryTriggers: r.primary_triggers ? r.primary_triggers.split(" | ").filter(Boolean) : [],
    predictability: r.predictability || "",
    temp: r.temperature ? parseFloat(r.temperature) : null,
    erVisit: r.er_visit || "",
    hospital: r.hospital || "",
    waitHours: r.wait_hours ? parseFloat(r.wait_hours) : 0,
    triageToTreatment: r.triage_to_treatment_hours ? parseFloat(r.triage_to_treatment_hours) : null,
    protocolFollowed: r.protocol_followed || "",
    whyNot: r.why_not_followed || "",
    treatment: r.treatment ? r.treatment.split(" | ").filter(Boolean) : [],
    admitted: r.admitted || "",
    outcome72h: r.outcome_72h || null,
    working: r.treatment_working || "",
    trackingFor: r.tracking_for || "",
    community: r.community || "",
    age: r.age ? Number(r.age) : null,
    consented: r.consent === true || r.consent === "true",
    notes: r.notes || "",
  }));
}

const RAW = [
  { id:"RGep70p", warriorId:"Jacob10-22194", submitted:"2025-12-31", crisisStart:"2025-11-02", ongoing:false, pain:10, painCompared:"Same as usual", painLocations:["Joints"], triggered:["Illness (cold, flu, infection)"], temp:49, erVisit:"Yes", hospital:"Memorial Hermann", waitHours:4, triageToTreatment:null, protocolFollowed:"No", whyNot:"", treatment:["Prescription pain medication"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Other CBO", age:null, consented:false, notes:"" },
  { id:"rj81eWp", warriorId:"Sheri05.8289", submitted:"2026-01-06", crisisStart:"2026-01-05", ongoing:true, pain:5, painCompared:"Worse than usual", painLocations:["Legs"], triggered:["Cold weather exposure"], temp:67, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Other CBO", age:null, consented:false, notes:"" },
  { id:"yP8RV4x", warriorId:"Joy02_29", submitted:"2026-01-06", crisisStart:"2026-01-02", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Legs","Joints","Arms"], triggered:["Lack of sleep","Dehydration (missed water intake)"], temp:null, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Over-the-counter pain relief","Hydration","Nothing is helping yet"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"ob8YWNe", warriorId:"Amara04-10", submitted:"2026-01-06", crisisStart:"2026-01-01", ongoing:true, pain:4, painCompared:"Worse than usual", painLocations:["Head"], triggered:["Cold weather exposure","Illness (cold, flu, infection)"], temp:56, erVisit:"Yes", hospital:"Doctor's Hospital Augusta GA", waitHours:1, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Over-the-counter pain relief","Heating pad","Hydration","Rest","Prescription pain medication"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Caregiver (child)", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"1AQaaZg", warriorId:"Andria07-14", submitted:"2026-01-07", crisisStart:"2025-11-18", ongoing:true, pain:9, painCompared:"Worse than usual", painLocations:["Abdomen","Legs","Joints","Back","Chest"], triggered:["Lack of sleep","Dehydration (missed water intake)","Illness (cold, flu, infection)","Physical overexertion"], temp:99.3, erVisit:"Yes", hospital:"Memorial Hermann Hospital TMC", waitHours:0, triageToTreatment:null, protocolFollowed:"No", whyNot:"", treatment:["Hydration","Prescription pain medication","Heating pad","Nothing is helping yet"], admitted:"N/A", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"yP8Qox6", warriorId:"Sickle cell Goddess_Char", submitted:"2026-01-07", crisisStart:"2026-01-06", ongoing:true, pain:6, painCompared:"Better than usual", painLocations:["Arms","Legs","Head","Joints"], triggered:["Physical overexertion","Changed altitude/air pressure"], temp:44, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"0QqK7g9", warriorId:"yanajadec7", submitted:"2026-01-07", crisisStart:"2025-12-28", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Arms","Legs","Joints","Head"], triggered:["Cold weather exposure","High stress situation"], temp:35, erVisit:"Yes", hospital:"UMC", waitHours:2, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"ODx6Obk", warriorId:"Jaydan0310", submitted:"2026-01-07", crisisStart:"2026-01-06", ongoing:true, pain:4, painCompared:"Worse than usual", painLocations:["Back","Legs","Abdomen","Joints"], triggered:["Lack of sleep","Cold weather exposure"], temp:34, erVisit:"Yes", hospital:"Bay Health", waitHours:0.3, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Heating pad","Hydration","Rest","Breathing exercises","Prescription pain medication"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Caregiver (child)", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"44VaR9o", warriorId:"Kia0505", submitted:"2026-01-09", crisisStart:"2026-01-07", ongoing:true, pain:4, painCompared:"Better than usual", painLocations:["Back","Legs"], triggered:["Lack of sleep"], temp:47, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Over-the-counter pain relief"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"pbpK5xV", warriorId:"Marques08-10", submitted:"2026-01-10", crisisStart:"2026-01-05", ongoing:true, pain:8, painCompared:"Same as usual", painLocations:["Back","Arms","Legs","Joints"], triggered:["High stress situation","Lack of sleep","Cold weather exposure"], temp:57, erVisit:"Yes", hospital:"UT Southwestern", waitHours:5, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"44V24xk", warriorId:"Kham944", submitted:"2026-01-10", crisisStart:"2026-01-01", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Legs","Joints","Back"], triggered:["Cold weather exposure","Lack of sleep"], temp:60, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Heating pad","Hydration","Rest","Breathing exercises","Prescription pain medication"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"pbpMPAE", warriorId:"Tiffani0116", submitted:"2026-01-12", crisisStart:"2026-01-08", ongoing:true, pain:5, painCompared:"Same as usual", painLocations:["Back","Legs","Joints"], triggered:["Lack of sleep","Illness (cold, flu, infection)","Dehydration (missed water intake)"], temp:58, erVisit:"Yes", hospital:"Gulfport Memorial Hospital", waitHours:1, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"b5QDPd6", warriorId:"Annette-0144", submitted:"2026-01-12", crisisStart:"2026-01-10", ongoing:true, pain:9, painCompared:"Worse than usual", painLocations:["Chest","Head"], triggered:["Cold weather exposure","High stress situation","Illness (cold, flu, infection)","Lack of sleep"], temp:57, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Heating pad","Hydration","Rest","Over-the-counter pain relief"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"Y5lvBDB", warriorId:"Phoenix09-13", submitted:"2026-01-13", crisisStart:"2026-01-11", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Chest"], triggered:["Cold weather exposure"], temp:null, erVisit:"Yes", hospital:"Rady Children's San Diego", waitHours:1, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Caregiver (child)", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"vG55Ekd", warriorId:"Valerie08-01", submitted:"2026-01-13", crisisStart:"2026-01-06", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Chest","Back","Arms","Legs","Joints"], triggered:["High stress situation","Physical overexertion","Lack of sleep","Cold weather exposure"], temp:70, erVisit:"Yes", hospital:"Advent Health East Orlando", waitHours:96, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest","Nothing is helping yet"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"zx55b01", warriorId:"Avery04-16", submitted:"2026-01-13", crisisStart:"2026-01-06", ongoing:true, pain:0, painCompared:"Same as usual", painLocations:["Back"], triggered:["Cold weather exposure","Illness (cold, flu, infection)"], temp:40, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Heating pad","Rest","Hydration","Over-the-counter pain relief"], admitted:"N/A", outcome72h:null, working:"Well", trackingFor:"Caregiver (child)", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"68EEY7e", warriorId:"Juanita12-1", submitted:"2026-01-13", crisisStart:"2026-01-12", ongoing:true, pain:6, painCompared:"Same as usual", painLocations:["Joints"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation","Lack of sleep","Physical overexertion"], temp:44, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Rest","Hydration","Heating pad"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Sickle Cell Warriors of Buffalo", age:null, consented:false, notes:"" },
  { id:"vG555Ql", warriorId:"Keirra11-23", submitted:"2026-01-13", crisisStart:"2025-12-18", ongoing:true, pain:10, painCompared:"Same as usual", painLocations:["Back","Legs","Joints"], triggered:["Cold weather exposure"], temp:63, erVisit:"Yes", hospital:"St Bernard's Hospital Jonesboro AR", waitHours:2, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Nothing is helping yet","Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"PdJJq2x", warriorId:"Shan08-2000", submitted:"2026-01-13", crisisStart:"2022-06-20", ongoing:true, pain:10, painCompared:"Worse than usual", painLocations:["Joints"], triggered:["High stress situation"], temp:95, erVisit:"Yes", hospital:"Bridgeport Hospital", waitHours:3, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"VLO6MJl", warriorId:"76555", submitted:"2026-01-14", crisisStart:"2025-10-06", ongoing:true, pain:8, painCompared:"Worse than usual", painLocations:["Chest","Back","Arms","Abdomen","Legs"], triggered:["Cold weather exposure","Dehydration (missed water intake)","Changed altitude/air pressure"], temp:48, erVisit:"Yes", hospital:"Nemours Children's Hospital", waitHours:1, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"N/A", outcome72h:null, working:"Not at all", trackingFor:"Caregiver (child)", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"yP5OjG6", warriorId:"Ben09$730", submitted:"2026-01-14", crisisStart:"2026-01-13", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Back","Legs","Chest"], triggered:["High stress situation","Physical overexertion","Cold weather exposure","Dehydration (missed water intake)"], temp:54, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Over-the-counter pain relief","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"q410JGd", warriorId:"Eni02-25", submitted:"2026-01-14", crisisStart:"2025-12-26", ongoing:false, pain:3, painCompared:"Same as usual", painLocations:["Legs","Back"], triggered:["Cold weather exposure"], temp:42.8, erVisit:"Yes", hospital:"Queen Elizabeth University Hospital", waitHours:2, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Rest","Heating pad"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"International Warrior", age:null, consented:false, notes:"" },
  { id:"dWeLGPV", warriorId:"HolyChild93", submitted:"2026-01-15", crisisStart:"2026-01-01", ongoing:true, pain:6, painCompared:"Same as usual", painLocations:["Arms","Back","Joints","Abdomen"], triggered:["Cold weather exposure","Lack of sleep","Physical overexertion"], temp:null, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"No", whyNot:"", treatment:["Prescription pain medication","Hydration","Heating pad","Rest","Nothing is helping yet"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"rjZyJpp", warriorId:"Nikki09-07", submitted:"2026-01-15", crisisStart:"2026-01-02", ongoing:true, pain:6, painCompared:"Worse than usual", painLocations:["Back","Legs","Abdomen","Joints"], triggered:["Lack of sleep","High stress situation"], temp:51, erVisit:"Yes", hospital:"St Davids Roundrock", waitHours:1.5, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Hydration","Rest","Prescription pain medication"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"Menstrual cramps triggered this crisis — menstrual cycle should be a trigger option." },
  { id:"EkOxO42", warriorId:"Kyle12-12", submitted:"2026-01-16", crisisStart:"2026-01-13", ongoing:true, pain:6, painCompared:"Same as usual", painLocations:["Abdomen","Legs","Joints"], triggered:["Cold weather exposure","Dehydration (missed water intake)","Lack of sleep"], temp:16, erVisit:"Yes", hospital:"Advent", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"No, treated and released", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"LZ2dro2", warriorId:"Tsahai09-09", submitted:"2026-01-16", crisisStart:"2026-01-03", ongoing:true, pain:3, painCompared:"Better than usual", painLocations:["Back","Legs"], triggered:["High stress situation","Physical overexertion","Changed altitude/air pressure"], temp:81, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"No, treated and released", outcome72h:null, working:"Well", trackingFor:"Myself", community:"International Warrior", age:null, consented:false, notes:"" },
  { id:"b5J2jEE", warriorId:"Kelsey07-06", submitted:"2026-01-17", crisisStart:"2025-12-01", ongoing:false, pain:6, painCompared:"Worse than usual", painLocations:["Legs","Back","Joints"], triggered:["Cold weather exposure","High stress situation","Menstrual cycle"], temp:63, erVisit:"Yes", hospital:"HCA University Hospital", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"Yes", outcome72h:null, working:"Well", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"Thank you for your concerns and your advocacy for sickle cell anemia." },
  { id:"QKQv77G", warriorId:"ShiningChariot", submitted:"2026-01-17", crisisStart:"2025-12-23", ongoing:false, pain:3, painCompared:"Same as usual", painLocations:["Back","Joints"], triggered:["High stress situation","Physical overexertion","Skipped medication"], temp:30, erVisit:"Yes", hospital:"New York Presbyterian Queens", waitHours:0.25, triageToTreatment:null, protocolFollowed:"No", whyNot:"The medical team chose not to follow it", treatment:["Prescription pain medication","Heating pad"], admitted:"Yes", outcome72h:null, working:"Well", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"Medical team low-balled me with 0.2 IV dilaudid — said my 2mg oral Dilaudid was not helping." },
  { id:"jaVk079", warriorId:"AriesQueen81", submitted:"2026-01-18", crisisStart:"2026-01-08", ongoing:true, pain:8, painCompared:"Same as usual", painLocations:["Joints","Legs","Arms","Abdomen"], triggered:["Cold weather exposure","Menstrual cycle"], temp:24, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Heating pad","Hydration","Prescription pain medication","Over-the-counter pain relief","Rest","Breathing exercises"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"International Warrior", age:null, consented:false, notes:"" },
  { id:"EkOMLvX", warriorId:"Baz10-17", submitted:"2026-01-18", crisisStart:"2025-11-30", ongoing:false, pain:9, painCompared:"Same as usual", painLocations:["Back","Legs","Arms"], triggered:["High stress situation","Dehydration (missed water intake)"], temp:-2, erVisit:"Yes", hospital:"Meilahti Hospital, Helsinki", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication"], admitted:"Yes", outcome72h:null, working:"Well", trackingFor:"Myself", community:"Other CBO", age:null, consented:false, notes:"This is a very good innovation. We need something more than this to help other Warriors out there." },
  { id:"EkOR9NX", warriorId:"Dorothy03-19", submitted:"2026-01-20", crisisStart:"2026-01-03", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Back","Legs","Joints"], triggered:["High stress situation","Menstrual cycle"], temp:8, erVisit:"Yes", hospital:"Community North", waitHours:3, triageToTreatment:null, protocolFollowed:"No", whyNot:"The medical team chose not to follow it", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"xXWABW5", warriorId:"Connie1013", submitted:"2026-01-20", crisisStart:"2026-01-07", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Back","Legs","Arms","Joints"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation","Physical overexertion","Lack of sleep"], temp:45, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"I'm a single parent of 3. My part time job feeds us so I can't afford to keep missing work. I feel lost." },
  { id:"EkO2VvX", warriorId:"akari01-444", submitted:"2026-01-20", crisisStart:"2026-01-19", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Chest","Back","Legs"], triggered:["Cold weather exposure","Illness (cold, flu, infection)"], temp:59, erVisit:"Yes", hospital:"Southshore Hospital", waitHours:1.5, triageToTreatment:null, protocolFollowed:"No", whyNot:"The medical team chose not to follow it", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"pb2gNlP", warriorId:"Carolina08-08", submitted:"2026-01-20", crisisStart:"2026-01-14", ongoing:true, pain:9, painCompared:"Worse than usual", painLocations:["Other"], triggered:["Dehydration (missed water intake)","Physical overexertion"], temp:49, erVisit:"Yes", hospital:"Advent Health Hospital Lake Nona", waitHours:0.25, triageToTreatment:null, protocolFollowed:"No", whyNot:"I didn't have a copy with me", treatment:["Prescription pain medication","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"Yes", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"RG9p5Ql", warriorId:"Ina08-15", submitted:"2026-01-20", crisisStart:"2026-01-19", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Chest","Legs","Joints","Back","Arms","Abdomen","Head"], triggered:["Cold weather exposure"], temp:34, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest"], admitted:"No, treated and released", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Other CBO", age:null, consented:false, notes:"" },
  { id:"pb284ZJ", warriorId:"Queenbee", submitted:"2026-01-21", crisisStart:"2026-01-12", ongoing:true, pain:8, painCompared:"Same as usual", painLocations:["Back","Head"], triggered:["High stress situation","Cold weather exposure","Lack of sleep"], temp:10, erVisit:"Yes", hospital:"New York Presbyterian", waitHours:3, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Heating pad","Prescription pain medication","Hydration"], admitted:"Still in hospital", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"b5pZj96", warriorId:"Yen516", submitted:"2026-01-21", crisisStart:"2026-01-21", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Arms","Legs","Back"], triggered:["Menstrual cycle","Cold weather exposure"], temp:65, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Nothing is helping yet","Rest"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"obP9jQ1", warriorId:"DSW0712", submitted:"2026-01-21", crisisStart:"2026-01-18", ongoing:true, pain:8, painCompared:"Same as usual", painLocations:["Legs","Joints"], triggered:["Cold weather exposure"], temp:null, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"Other", whyNot:"", treatment:["Prescription pain medication"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"pbEWQvV", warriorId:"Damein09-7", submitted:"2026-01-24", crisisStart:"2026-01-21", ongoing:true, pain:6, painCompared:"Same as usual", painLocations:["Chest","Back","Joints"], triggered:["Cold weather exposure","High stress situation"], temp:14, erVisit:"Yes", hospital:"Mercy Health St. Elizabeth", waitHours:0.25, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Heating pad","Hydration","Prescription pain medication","Nothing is helping yet"], admitted:"Yes", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"OD2jApY", warriorId:"AJ0223", submitted:"2026-01-24", crisisStart:"2026-01-23", ongoing:true, pain:6, painCompared:"Better than usual", painLocations:["Legs"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation"], temp:23, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"No", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"I appreciate what yall doing. I used to have aspirations of doing something similar." },
  { id:"gDl2NXJ", warriorId:"Tiffani0116", submitted:"2026-01-28", crisisStart:"2026-01-25", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Back","Legs"], triggered:["Cold weather exposure","Menstrual cycle"], temp:28, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"A7gZN5k", warriorId:"MJB18", submitted:"2026-01-28", crisisStart:"2025-12-06", ongoing:false, pain:4, painCompared:"Worse than usual", painLocations:["Chest"], triggered:["Cold weather exposure","Dehydration (missed water intake)","Illness (cold, flu, infection)"], temp:50, erVisit:"Yes", hospital:"UC Davis", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Hydration","Rest","Over-the-counter pain relief"], admitted:"Yes", outcome72h:null, working:"Not at all", trackingFor:"Caregiver (child)", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"9q8Nv9E", warriorId:"M97", submitted:"2026-01-28", crisisStart:"2026-01-25", ongoing:true, pain:6, painCompared:"Same as usual", painLocations:["Arms","Legs"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation","Lack of sleep","Illness (cold, flu, infection)","Skipped medication","Physical overexertion"], temp:65, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Hydration","Rest","Breathing exercises","Nothing is helping yet"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"obq9WZb", warriorId:"Atiya06-60", submitted:"2026-01-29", crisisStart:"2026-01-12", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Arms","Back","Legs"], triggered:["Cold weather exposure","High stress situation","Menstrual cycle"], temp:43, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Over-the-counter pain relief","Heating pad","Hydration","Rest","Breathing exercises","Prescription pain medication"], admitted:"N/A", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"vGlMVWv", warriorId:"Bria03-29", submitted:"2026-01-29", crisisStart:"2026-01-21", ongoing:true, pain:10, painCompared:"Same as usual", painLocations:["Legs"], triggered:["Cold weather exposure","Menstrual cycle"], temp:10, erVisit:"Yes", hospital:"Medstar Washington Hospital Center", waitHours:1.5, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad"], admitted:"Still in hospital", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"7RybVL9", warriorId:"JasW11-07", submitted:"2026-01-29", crisisStart:"2026-01-24", ongoing:true, pain:8, painCompared:"Worse than usual", painLocations:["Legs","Joints"], triggered:["Cold weather exposure","High stress situation","Physical overexertion","Menstrual cycle"], temp:11, erVisit:"Yes", hospital:"University Hospitals", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Breathing exercises"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Other CBO", age:null, consented:false, notes:"ER copays $400. Sickle cell clinic bills $730 every visit. Cigna could not help." },
  { id:"jajQxVY", warriorId:"Taylor02", submitted:"2026-01-30", crisisStart:"2026-01-26", ongoing:false, pain:0, painCompared:"Worse than usual", painLocations:["Back"], triggered:["Cold weather exposure","High stress situation","Menstrual cycle"], temp:40, erVisit:"Yes", hospital:"HCA Lake Jackson", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Hydration"], admitted:"Yes", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Other CBO", age:null, consented:false, notes:"" },
  { id:"Bzr1bkR", warriorId:"Chris05-22", submitted:"2026-01-30", crisisStart:"2026-01-25", ongoing:true, pain:5, painCompared:"Worse than usual", painLocations:["Back"], triggered:["Cold weather exposure","Physical overexertion"], temp:43, erVisit:"Yes", hospital:"St George's Hospital", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication"], admitted:"Yes", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"International Warrior", age:null, consented:false, notes:"" },
  { id:"aQRxPbB", warriorId:"Brianna10-626", submitted:"2026-01-30", crisisStart:"2026-01-01", ongoing:false, pain:4, painCompared:"Same as usual", painLocations:["Back","Legs"], triggered:["Cold weather exposure","High stress situation","Illness (cold, flu, infection)"], temp:50, erVisit:"Yes", hospital:"", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Hydration","Rest","Prescription pain medication"], admitted:"Yes", outcome72h:null, working:"Well", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"Pd70Zld", warriorId:"Shay2002", submitted:"2026-01-30", crisisStart:"2026-01-25", ongoing:true, pain:9, painCompared:"Worse than usual", painLocations:["Chest"], triggered:["Cold weather exposure","Illness (cold, flu, infection)"], temp:2, erVisit:"Yes", hospital:"IU Methodist", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication"], admitted:"Still in hospital", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"9q8vOr4", warriorId:"Sosa05-32", submitted:"2026-01-31", crisisStart:"2026-01-25", ongoing:true, pain:8, painCompared:"Same as usual", painLocations:["Back","Legs","Joints"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation","Lack of sleep","Illness (cold, flu, infection)","Menstrual cycle"], temp:28, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest","Nothing is helping yet"], admitted:"N/A", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"5BJvLNo", warriorId:"Sosa05-32", submitted:"2026-01-31", crisisStart:"2026-01-15", ongoing:false, pain:10, painCompared:"Worse than usual", painLocations:["Abdomen","Legs","Back"], triggered:["Cold weather exposure","High stress situation","Lack of sleep"], temp:17, erVisit:"Yes", hospital:"Atrium SouthPark Charlotte NC", waitHours:0.25, triageToTreatment:null, protocolFollowed:"No", whyNot:"The medical team chose not to follow it", treatment:["Prescription pain medication","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"No, treated and released", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"XxpM4Od", warriorId:"StrawhatSickleman", submitted:"2026-01-31", crisisStart:"2026-01-17", ongoing:true, pain:8, painCompared:"Worse than usual", painLocations:["Legs","Joints"], triggered:["Cold weather exposure","Physical overexertion"], temp:60, erVisit:"Yes", hospital:"Memorial Hospital", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Rest","Heating pad"], admitted:"Yes", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"Appreciate you and what you doing and giving a voice to those of us who suffer in silence." },
  { id:"yPBEGB0", warriorId:"Jazzmon06-17", submitted:"2026-01-31", crisisStart:"2025-11-24", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Back","Arms","Abdomen","Legs"], triggered:["High stress situation","Lack of sleep"], temp:38, erVisit:"Yes", hospital:"Memorial Hermann Pearland", waitHours:1.5, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration"], admitted:"Yes", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"Sent home twice — retic count used to override 10/10 pain. Admission denied; doctor cited addiction risk over morphine PCA pump." },
  { id:"ZjMGQez", warriorId:"Cecilia1025", submitted:"2026-01-31", crisisStart:"2026-01-26", ongoing:true, pain:5, painCompared:"Same as usual", painLocations:["Abdomen","Legs","Joints"], triggered:["Menstrual cycle"], temp:21, erVisit:"Yes", hospital:"Duke University", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"0QKkNbA", warriorId:"Zellthe1", submitted:"2026-02-02", crisisStart:"2026-02-01", ongoing:true, pain:8, painCompared:"Same as usual", painLocations:["Legs"], triggered:["Cold weather exposure"], temp:27, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Heating pad","Hydration","Prescription pain medication"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"OD6Vxg7", warriorId:"Bri", submitted:"2026-02-02", crisisStart:"2026-01-26", ongoing:true, pain:3, painCompared:"Same as usual", painLocations:["Chest","Back"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation","Physical overexertion"], temp:21, erVisit:"Yes", hospital:"Froedtert", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Heating pad","Hydration","Rest"], admitted:"Yes", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"5BJ5gPN", warriorId:"Sickledc319", submitted:"2026-02-02", crisisStart:"2026-01-20", ongoing:true, pain:10, painCompared:"Worse than usual", painLocations:["Back","Legs","Joints"], triggered:["Menstrual cycle","Illness (cold, flu, infection)","Lack of sleep","High stress situation","Cold weather exposure"], temp:15, erVisit:"Yes", hospital:"New York Presbyterian Brooklyn Methodist", waitHours:4, triageToTreatment:null, protocolFollowed:"No", whyNot:"They follow their own protocol", treatment:["Nothing is helping yet"], admitted:"Still in hospital", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"I hate being treated as an addict rather than a patient." },
  { id:"RGA15Jp", warriorId:"Dadutchezz929", submitted:"2026-02-02", crisisStart:"2026-01-31", ongoing:false, pain:6, painCompared:"Same as usual", painLocations:["Mouth"], triggered:["Cold weather exposure"], temp:6, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Rest"], admitted:"N/A", outcome72h:null, working:"Well", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"Glad I came across this site so that I can track my crises." },
  { id:"WO4NgBR", warriorId:"TeeMon2125", submitted:"2026-02-06", crisisStart:"2026-02-03", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Back","Head","Joints","Legs","Arms"], triggered:["Cold weather exposure","High stress situation","Lack of sleep"], temp:null, erVisit:"Yes", hospital:"Candler Hospital", waitHours:0.25, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Over-the-counter pain relief","Heating pad","Hydration","Rest"], admitted:"Still in hospital", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"J9yJVEX", warriorId:"Jessica06-14", submitted:"2026-02-07", crisisStart:"2026-02-05", ongoing:true, pain:10, painCompared:"Same as usual", painLocations:["Back","Legs","Joints"], triggered:["Cold weather exposure","Menstrual cycle","Changed altitude/air pressure","Lack of sleep"], temp:48, erVisit:"Yes", hospital:"University of Arkansas for Medical Sciences", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Over-the-counter pain relief","Hydration","Nothing is helping yet"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"Ekpbo4A", warriorId:"Jendani", submitted:"2026-02-07", crisisStart:"2026-01-29", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Joints","Back"], triggered:["Cold weather exposure","High stress situation","Lack of sleep","Physical overexertion"], temp:29, erVisit:"Yes", hospital:"Sentara", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration"], admitted:"Yes", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"WO4vXge", warriorId:"Attitude1208", submitted:"2026-02-12", crisisStart:"2026-01-30", ongoing:true, pain:9, painCompared:"Worse than usual", painLocations:["Chest","Back","Arms","Legs","Joints","Abdomen","Head"], triggered:["High stress situation","Physical overexertion","Menstrual cycle","Cold weather exposure","Illness (cold, flu, infection)"], temp:60, erVisit:"Yes", hospital:"Memorial Hermann", waitHours:4, triageToTreatment:null, protocolFollowed:"No", whyNot:"The medical team chose not to follow it", treatment:["Prescription pain medication","Heating pad","Hydration","Rest","Breathing exercises"], admitted:"Yes", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"I think this is amazing and if you need anything lmk what I can do to help out." },
  { id:"7RGNRLZ", warriorId:"Sickle Cell Soldier", submitted:"2026-02-13", crisisStart:"2026-02-11", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Legs","Joints","Chest"], triggered:["High stress situation","Lack of sleep","Cold weather exposure","Dehydration (missed water intake)"], temp:51, erVisit:"Yes", hospital:"George County Regional Hospital", waitHours:2.5, triageToTreatment:null, protocolFollowed:"No", whyNot:"The medical team chose not to follow it", treatment:["Prescription pain medication","Heating pad","Hydration","Nothing is helping yet"], admitted:"No, treated and released", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"I stay in a very rural area. The hospital staff feels as if they can do as they please without any repercussions." },
  { id:"xXKlqL5", warriorId:"Nancy12-8", submitted:"2026-02-17", crisisStart:"2026-02-15", ongoing:true, pain:5, painCompared:"Worse than usual", painLocations:["Legs","Joints"], triggered:["Dehydration (missed water intake)","Physical overexertion"], temp:33, erVisit:"Yes", hospital:"Inova Hospital, Alexandria VA", waitHours:0.25, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Hydration","Rest","Prescription pain medication"], admitted:"Yes", outcome72h:null, working:"Moderately", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"68o5veY", warriorId:"Akari01-4", submitted:"2026-02-18", crisisStart:"2026-02-17", ongoing:true, pain:8, painCompared:"Worse than usual", painLocations:["Back","Legs","Abdomen"], triggered:["Menstrual cycle"], temp:65, erVisit:"Not yet", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Prescription pain medication","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"zxlB7v0", warriorId:"Damein09-7", submitted:"2026-02-18", crisisStart:"2026-02-16", ongoing:true, pain:7, painCompared:"Same as usual", painLocations:["Arms","Legs","Joints"], triggered:["Cold weather exposure"], temp:24, erVisit:"Yes", hospital:"Mercy Health St. Elizabeth Boardman", waitHours:0, triageToTreatment:null, protocolFollowed:"No", whyNot:"The medical team chose not to follow it", treatment:["Hydration","Rest","Nothing is helping yet"], admitted:"Yes", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"dWBEogo", warriorId:"Juanita12-05", submitted:"2026-02-21", crisisStart:"2026-02-19", ongoing:true, pain:6, painCompared:"Same as usual", painLocations:["Joints","Legs"], triggered:["Cold weather exposure","Skipped medication"], temp:32, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"", whyNot:"", treatment:["Rest","Over-the-counter pain relief"], admitted:"N/A", outcome72h:null, working:"Not at all", trackingFor:"Myself", community:"Sickle Cell Warriors of Buffalo", age:null, consented:false, notes:"" },
  { id:"2EQBOPD", warriorId:"Vin02-26", submitted:"2026-02-21", crisisStart:"2026-01-24", ongoing:false, pain:3, painCompared:"Better than usual", painLocations:["Arms","Joints"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation","Physical overexertion"], temp:null, erVisit:"Yes", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Hydration","Rest"], admitted:"Yes", outcome72h:null, working:"A little", trackingFor:"Myself", community:"Independent Warrior", age:null, consented:false, notes:"" },
  { id:"2EQ2NlV", warriorId:"ChompChomp", submitted:"2026-02-27", crisisStart:"2026-02-21", ongoing:false, pain:0, painCompared:"Same as usual", painLocations:["Other"], triggered:["Cold weather exposure","Illness (cold, flu, infection)"], temp:36, erVisit:"Yes", hospital:"Mary Bridge Children's Hospital", waitHours:0.25, triageToTreatment:null, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Heating pad","Hydration","Rest"], admitted:"Yes", outcome72h:"Pain resolved — recovered", working:"Well", trackingFor:"Caregiver (child)", community:"Independent Warrior", age:null, consented:false, notes:"Pain went from 8 to 0 over 6 days. Hopefully she can go home tomorrow. Stay strong fam ♡ much love from the PNW." },
  { id:"J9NPxyz", warriorId:"CC12-4838", submitted:"2026-03-06", crisisStart:"2026-02-23", ongoing:false, pain:0, painCompared:"Better than usual", painLocations:["Arms","Neck"], triggered:["Illness (cold, flu, infection)","High stress situation"], temp:60, erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Prescription pain medication","Over-the-counter pain relief","Hydration","Rest"], admitted:"N/A", outcome72h:null, working:"Well", trackingFor:"Myself", community:"International Warrior", age:50, consented:true, notes:"" },
  { id:"68Xb9GO", warriorId:"David03-60", submitted:"2026-03-08", crisisStart:"2026-03-07", ongoing:true, pain:6, painCompared:"Same as usual", painLocations:["Arms","Legs","Back"], triggered:["Cold weather exposure","Dehydration (missed water intake)","High stress situation","Illness (cold, flu, infection)"], primaryTriggers:["Dehydration (missed water intake)","Cold weather exposure"], temp:77, predictability:"Some warning signs", erVisit:"No", hospital:"", waitHours:0, triageToTreatment:null, protocolFollowed:"No protocol", whyNot:"", treatment:["Over-the-counter pain relief","Rest","Hydration","Nothing is helping yet"], admitted:"N/A", outcome72h:null, working:"A little", trackingFor:"Myself", community:"International Warrior", age:28, consented:true, notes:"" },
  { id:"zxpxQAg", warriorId:"Alexis15-3", submitted:"2026-03-08", crisisStart:"2026-03-02", ongoing:true, pain:7, painCompared:"Worse than usual", painLocations:["Chest","Back","Legs","Hips"], triggered:["Cold weather exposure","Menstrual cycle"], primaryTriggers:["Cold weather exposure"], temp:40, predictability:"Came out of nowhere", erVisit:"Yes", hospital:"Virtua in Voorhees NJ", waitHours:0.5, triageToTreatment:1, protocolFollowed:"Yes", whyNot:"", treatment:["Prescription pain medication","Hydration","Rest","Morphine drip"], admitted:"Still in hospital now", outcome72h:null, working:"Moderately", trackingFor:"Caregiver (family member)", community:"Independent Warrior", age:32, consented:true, notes:"Hospital was full — placed in surgery recovery area. 2 blood transfusions this week, hemoglobin dropping to 7.2, continuous low fever, BP unstable when sitting. SC genotype. Second crisis in 2 months. Morphine drip started 3/7. Wants check-in." },
];

// ── FUZZY MATCH ───────────────────────────────────────────────────────────────
function norm(s){return s.toLowerCase().replace(/[\s\-_.$]/g,"").trim();}
function levenshtein(a,b){
  const dp=Array.from({length:a.length+1},(_,i)=>Array.from({length:b.length+1},(_,j)=>j===0?i:0));
  for(let j=1;j<=b.length;j++)dp[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)
    dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[a.length][b.length];
}
function findMatches(query){
  const q=norm(query);
  if(!q)return{exact:[],fuzzy:[]};
  const byKey={};
  RAW.forEach(d=>{const k=norm(d.warriorId);if(!byKey[k])byKey[k]={warriorId:d.warriorId,entries:[]};byKey[k].entries.push(d);});
  const exact=[],fuzzy=[];
  Object.entries(byKey).forEach(([k,val])=>{
    if(k===q||k.startsWith(q)||q.startsWith(k.slice(0,Math.min(6,k.length))))exact.push(val);
    else{const dist=levenshtein(q,k);if(dist<=Math.max(2,Math.floor(Math.max(q.length,k.length)*0.28)))fuzzy.push({...val,dist});}
  });
  return{exact,fuzzy:fuzzy.sort((a,b)=>a.dist-b.dist).slice(0,3)};
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const TS={"Cold weather exposure":"Cold Weather","High stress situation":"High Stress","Lack of sleep":"Lack of Sleep","Dehydration (missed water intake)":"Dehydration","Menstrual cycle":"Menstrual Cycle","Illness (cold, flu, infection)":"Illness/Infection","Physical overexertion":"Overexertion","Changed altitude/air pressure":"Altitude/Pressure","Skipped medication":"Skipped Medication"};
const avgPain=e=>{const v=e.map(x=>x.pain).filter(p=>p>0);return v.length?(v.reduce((a,b)=>a+b,0)/v.length).toFixed(1):"—";};
const normPC=s=>{if(!s)return s;return s.replace(/Worse thn usual/i,"Worse than usual").replace(/Better thn usual/i,"Better than usual");}; 
const countT=entries=>{const c={};entries.forEach(e=>e.triggered.forEach(t=>{const s=TS[t]||t;c[s]=(c[s]||0)+1;}));return Object.entries(c).sort((a,b)=>b[1]-a[1]);};
const painCol=p=>p>=8?"#e85555":p>=5?"#f0a500":"#4ade80";
const days=(a,b)=>Math.round((new Date(b)-new Date(a))/(864e5));
const allViolations=()=>RAW.filter(d=>d.erVisit==="Yes"&&(d.protocolFollowed==="No"||(d.whyNot&&d.whyNot.toLowerCase().includes("medical team"))));
const allReturning=()=>{const m={};RAW.forEach(d=>{const k=norm(d.warriorId);if(!m[k])m[k]=[];m[k].push(d);});return Object.values(m).filter(a=>a.length>1).sort((a,b)=>b.length-a.length);};

// ── TOKENS ────────────────────────────────────────────────────────────────────
const C={bg:"#08080e",surf:"#0f0f18",surf2:"#16161f",border:"rgba(255,255,255,0.07)",muted:"rgba(255,255,255,0.38)",text:"rgba(255,255,255,0.91)",red:"#e85555",amber:"#f0a500",green:"#4ade80",blue:"#60a5fa",purple:"#c084fc",teal:"#2dd4bf"};
const css=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${C.bg};color:${C.text};font-family:'IBM Plex Sans',sans-serif;}
  input::placeholder{color:${C.muted};} input:focus{outline:none;}
  ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease forwards;}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}} .live{animation:blink 2s infinite;}
  button{cursor:pointer;font-family:'IBM Plex Sans',sans-serif;}
`;

// ── MICRO COMPONENTS ──────────────────────────────────────────────────────────
const Tag=({label,color})=>(<span style={{display:"inline-block",fontSize:11,padding:"2px 9px",borderRadius:20,background:`${color}18`,color,border:`1px solid ${color}28`,marginRight:4,marginBottom:4}}>{label}</span>);
const Pill=({label,value,accent,sub})=>(<div style={{textAlign:"center",padding:"14px 16px",background:C.surf2,borderRadius:12,border:`1px solid ${C.border}`,borderTop:`2px solid ${accent}`}}><div style={{fontSize:28,fontFamily:"Syne",fontWeight:800,color:accent,lineHeight:1}}>{value}</div><div style={{fontSize:11,color:C.muted,marginTop:3,letterSpacing:.4}}>{label}</div>{sub&&<div style={{fontSize:10,color:C.muted,marginTop:1}}>{sub}</div>}</div>);

// ── TIMELINE ENTRY ────────────────────────────────────────────────────────────
function Entry({e,isLast}){
  const pc=painCol(e.pain);
  const viol=e.erVisit==="Yes"&&(e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team")));
  const dur=days(e.crisisStart,e.submitted);
  const isFirstConsented=e.consented&&e.id==="J9NPxyz";
  const isRecoveryArc=e.outcome72h&&e.outcome72h.includes("resolved");
  return(
    <div style={{display:"flex",gap:14}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
        <div style={{width:13,height:13,borderRadius:"50%",background:pc,border:`2px solid ${C.bg}`,boxShadow:`0 0 10px ${pc}55`,marginTop:4,flexShrink:0}}/>
        {!isLast&&<div style={{width:2,flex:1,background:C.border,marginTop:3,minHeight:20}}/>}
      </div>
      <div style={{flex:1,paddingBottom:isLast?0:18}}>
        <div className="fade" style={{background:C.surf2,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${viol?C.red:isRecoveryArc?C.green:pc}`}}>
          {isFirstConsented&&<div style={{fontSize:10,letterSpacing:1.5,color:C.teal,textTransform:"uppercase",marginBottom:8,background:`${C.teal}12`,padding:"3px 10px",borderRadius:4,display:"inline-block"}}>✓ First Consented Submission — Mar 6, 2026</div>}
          {isRecoveryArc&&<div style={{fontSize:10,letterSpacing:1.5,color:C.green,textTransform:"uppercase",marginBottom:8,background:`${C.green}12`,padding:"3px 10px",borderRadius:4,display:"inline-block"}}>✓ Documented Recovery</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,flexWrap:"wrap",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:12,color:C.muted}}>{e.submitted}</span>
              {e.ongoing&&<span className="live" style={{fontSize:10,color:C.green,letterSpacing:.5}}>● ONGOING</span>}
              {e.consented&&<span style={{fontSize:10,color:C.teal}}>✓ Consented</span>}
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:11,fontFamily:"Syne",fontWeight:700,padding:"3px 10px",borderRadius:20,background:`${pc}18`,color:pc,border:`1px solid ${pc}30`}}>Pain {e.pain}/10</span>
              {e.painCompared!=="Same as usual"&&<span style={{fontSize:11,color:e.painCompared.includes("Worse")?C.red:C.green}}>{e.painCompared}</span>}
            </div>
          </div>
          <div style={{fontSize:12,color:C.muted,marginBottom:8}}>Started {e.crisisStart}{dur>0&&<span style={{color:C.text}}> · {dur} day{dur!==1?"s":""} duration</span>}{e.age&&<span style={{color:C.muted}}> · Age {e.age}</span>}</div>
          {e.painLocations.length>0&&<div style={{marginBottom:8}}><span style={{fontSize:10,letterSpacing:1.5,color:C.muted,textTransform:"uppercase",marginRight:6}}>Where</span>{e.painLocations.map(l=><Tag key={l} label={l} color={C.blue}/>)}</div>}
          {e.triggered.length>0&&<div style={{marginBottom:8}}><span style={{fontSize:10,letterSpacing:1.5,color:C.muted,textTransform:"uppercase",marginRight:6}}>Triggers</span>{e.triggered.map(t=><Tag key={t} label={TS[t]||t} color={t.includes("Menstrual")?C.purple:C.amber}/>)}</div>}
          <div style={{fontSize:12,color:C.muted,marginBottom:e.erVisit==="Yes"||e.triageToTreatment||e.outcome72h||e.notes?8:0}}><span style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginRight:6}}>Treatment</span><span style={{color:C.text}}>{e.treatment.join(", ")||"—"}</span>{e.working&&<span style={{color:C.muted}}> — {e.working}</span>}</div>
          {e.triageToTreatment&&<div style={{fontSize:12,marginBottom:8,color:C.muted}}><span style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginRight:6}}>Triage→Treatment</span><span style={{color:C.text}}>{e.triageToTreatment}h</span></div>}
          {e.erVisit==="Yes"&&<div style={{marginTop:8,padding:"10px 14px",borderRadius:8,background:viol?`${C.red}0c`:`${C.green}0a`,border:`1px solid ${viol?C.red+"28":C.green+"25"}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4,marginBottom:4}}><span style={{fontSize:13,fontWeight:500}}>🏥 {e.hospital||"ER Visit"}</span>{e.waitHours>0&&<span style={{fontSize:11,color:C.muted}}>{e.waitHours}h wait</span>}</div><div style={{fontSize:12,color:viol?C.red:C.green}}>{viol?`✗ Protocol NOT followed${e.whyNot?` — ${e.whyNot}`:""}`:e.protocolFollowed==="Yes"?"✓ Protocol followed":e.protocolFollowed==="No protocol"?"⚠ No protocol on file":"Protocol status unclear"}</div>{e.admitted&&e.admitted!=="N/A"&&<div style={{fontSize:11,color:C.muted,marginTop:3}}>Admission: {e.admitted}</div>}</div>}
          {e.outcome72h&&<div style={{marginTop:8,padding:"8px 12px",borderRadius:8,background:`${C.green}0a`,border:`1px solid ${C.green}25`,fontSize:12,color:C.green}}>72h outcome: {e.outcome72h}</div>}
          {e.notes&&<div style={{marginTop:10,fontSize:12,fontStyle:"italic",color:C.muted,borderLeft:`2px solid ${C.amber}50`,paddingLeft:10,lineHeight:1.6}}>"{e.notes}"</div>}
        </div>
      </div>
    </div>
  );
}

// ── PATTERN MIRROR ───────────────────────────────────────────────────────────
function PatternMirror({entries}){
  if(entries.length<1) return null;

  // Build trigger combination frequency
  const combos={};
  entries.forEach(e=>{
    const triggers=e.triggered||[];
    if(triggers.length<2){
      // Single trigger
      const key=triggers[0];
      if(key){combos[key]=(combos[key]||0)+1;}
    } else {
      // All pairs
      for(let i=0;i<triggers.length;i++){
        for(let j=i+1;j<triggers.length;j++){
          const pair=[TS[triggers[i]]||triggers[i],TS[triggers[j]]||triggers[j]].sort().join(" + ");
          combos[pair]=(combos[pair]||0)+1;
        }
      }
    }
  });

  const sorted=Object.entries(combos).sort((a,b)=>b[1]-a[1]);
  const topCombo=sorted[0];
  const hasMenstrual=entries.some(e=>e.triggered&&e.triggered.some(t=>t.includes("Menstrual")));
  const violCount=entries.filter(e=>e.erVisit==="Yes"&&(e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team")))).length;
  const avgP=entries.map(e=>e.pain).filter(p=>p>0);
  const avg=avgP.length?(avgP.reduce((a,b)=>a+b,0)/avgP.length).toFixed(1):null;

  // Build the insight sentence
  let insight="";
  if(topCombo && topCombo[1]>1){
    const pct=Math.round(topCombo[1]/entries.length*100);
    const count=topCombo[1];
    const total=entries.length;
    insight=`${topCombo[0]} appeared together in ${count} of your ${total} report${total!==1?"s":""} (${pct}%).`;
  } else if(topCombo){
    insight=`Your most consistent trigger: ${topCombo[0]} — appeared in every report you've submitted.`;
  }

  const lines=[];
  if(insight) lines.push({text:insight, color:C.amber});
  if(hasMenstrual) lines.push({text:"Menstrual cycle is a documented trigger in your data — you identified this before most clinical systems would catch it.", color:C.purple});
  if(violCount>0) lines.push({text:`${violCount} protocol violation${violCount>1?"s":""} on record. Your experience is part of the community evidence base.`, color:C.red});
  // Contribution visibility — what their data is doing
  lines.push({text:"Your submissions are contributing to: community crisis tracking, ER accountability reporting, and trigger pattern detection.", color:C.teal, isContrib:true});
  // avg pain already shown in pills — omitted from mirror

  // Community comparison — locate Warrior inside the larger pattern
  const communityTriggers={"Cold Weather":74,"High Stress":51,"Lack of Sleep":45,"Dehydration":35,"Menstrual Cycle":23,"Illness/Infection":31,"Overexertion":28};
  const warriorTopTrigger=topCombo?topCombo[0].split(" + ")[0].trim():null;
  const communityPct=warriorTopTrigger?communityTriggers[warriorTopTrigger]:null;

  if(lines.length===0) return null;

  return(
    <div className="fade" style={{background:`linear-gradient(135deg,${C.surf2},${C.surf})`,border:`1px solid ${C.amber}30`,borderRadius:14,padding:24,marginBottom:20,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.amber},${C.purple})`}}/>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:`${C.amber}18`,border:`1px solid ${C.amber}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>◈</div>
        <div>
          <div style={{fontFamily:"Syne",fontWeight:700,fontSize:13,color:C.amber,letterSpacing:.5}}>PATTERN MIRROR</div>
          <div style={{fontSize:11,color:C.muted}}>What your data is telling you</div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {lines.map((l,i)=>(
          l.isContrib
          ? <div key={i} style={{marginTop:4,paddingTop:12,borderTop:`1px solid rgba(255,255,255,0.06)`,fontSize:11,color:C.teal,lineHeight:1.7,letterSpacing:.2}}>
              <span style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginRight:6,opacity:.7}}>Your data is already working —</span>
              {l.text.replace("Your submissions are contributing to: ","")}
            </div>
          : <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{color:l.color,fontSize:14,marginTop:1,flexShrink:0}}>→</span>
              <span style={{fontSize:13,lineHeight:1.7,color:"rgba(255,255,255,0.82)"}}><span style={{color:l.color,fontWeight:500}}>{l.text.split(" ")[0]+( l.text.split(" ")[1]?" "+l.text.split(" ")[1]:"")}</span>{" "+l.text.split(" ").slice(2).join(" ")}</span>
            </div>
        ))}
      </div>
      {entries.length===1&&<div style={{marginTop:12,fontSize:11,color:C.muted,fontStyle:"italic"}}>Submit more entries to unlock deeper pattern analysis.</div>}
      {communityPct&&entries.length>1&&(
        <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid rgba(255,255,255,0.06)`}}>
          <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.muted,marginBottom:8}}>You + The Community</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:11,color:C.text,width:130,flexShrink:0}}>Your reports</div>
              <div style={{flex:1,height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:3,background:C.amber,width:"100%"}}/>
              </div>
              <div style={{fontSize:11,color:C.amber,width:32,textAlign:"right",flexShrink:0}}>100%</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:11,color:C.muted,width:130,flexShrink:0}}>Community</div>
              <div style={{flex:1,height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:3,background:C.teal,width:`${communityPct}%`,transition:"width 1s ease"}}/>
              </div>
              <div style={{fontSize:11,color:C.teal,width:32,textAlign:"right",flexShrink:0}}>{communityPct}%</div>
            </div>
          </div>
          <div style={{fontSize:11,color:C.muted,marginTop:8,lineHeight:1.6}}>
            <span style={{color:C.amber}}>{warriorTopTrigger}</span> is your top trigger — and {communityPct}% of Warriors in the community report the same.
          </div>
        </div>
      )}
    </div>
  );
}

// ── STABILITY SCORE ──────────────────────────────────────────────────────────
function StabilityScore({entries}){
  if(entries.length<2) return null;

  const sorted=[...entries].sort((a,b)=>new Date(a.submitted)-new Date(b.submitted));
  const recent=sorted.slice(-3); // last 3 entries

  // Factor 1: Pain trajectory (are recent crises better or worse?)
  const pains=sorted.map(e=>e.pain).filter(p=>p>0);
  const firstHalf=pains.slice(0,Math.floor(pains.length/2));
  const secondHalf=pains.slice(Math.floor(pains.length/2));
  const avgFirst=firstHalf.length?firstHalf.reduce((a,b)=>a+b,0)/firstHalf.length:5;
  const avgSecond=secondHalf.length?secondHalf.reduce((a,b)=>a+b,0)/secondHalf.length:5;
  const painDelta=avgSecond-avgFirst; // positive = getting worse

  // Factor 2: Crisis frequency (days between crises)
  const gaps=[];
  for(let i=1;i<sorted.length;i++){
    gaps.push(days(sorted[i-1].submitted, sorted[i].submitted));
  }
  const avgGap=gaps.length?gaps.reduce((a,b)=>a+b,0)/gaps.length:30;

  // Factor 3: Is latest crisis still ongoing?
  const latestOngoing=sorted[sorted.length-1].ongoing;

  // Factor 4: Recent ER rate
  const recentERRate=recent.filter(e=>e.erVisit==="Yes").length/recent.length;

  // Score: 0-100, higher = more stable
  let score=60; // baseline
  if(painDelta<-1) score+=15; // pain improving
  else if(painDelta>1) score-=15; // pain worsening
  if(avgGap>21) score+=15; // crises spreading out
  else if(avgGap<7) score-=15; // crises clustering
  if(!latestOngoing) score+=10; // last crisis resolved
  else score-=10; // still in crisis
  if(recentERRate<0.33) score+=10; // managing more at home
  else if(recentERRate>0.66) score-=10; // frequent ER

  // Stability Window: days since last submission + longest gap
  const lastSubmitted=sorted[sorted.length-1].submitted;
  const today=new Date().toISOString().slice(0,10);
  const daysSinceLast=days(lastSubmitted,today);
  const longestGap=gaps.length?Math.max(...gaps):0;

  // Bonus: if last crisis is resolved AND long gap, push toward stable
  if(!latestOngoing && daysSinceLast>30) score+=20;
  else if(!latestOngoing && daysSinceLast>14) score+=10;

  score=Math.max(10,Math.min(95,score));

  const band=score>=65?{label:"Stable",color:C.green,bg:`${C.green}0c`,border:`${C.green}25`,msg:"Your recent data shows improving patterns. Crises are becoming less frequent or less severe."}
    :score>=40?{label:"Watchful",color:C.amber,bg:`${C.amber}0c`,border:`${C.amber}25`,msg:"Your pattern shows active stress. Pay attention to your known triggers in the coming days."}
    :{label:"High Load",color:C.red,bg:`${C.red}0c`,border:`${C.red}25`,msg:"Your recent data reflects a high-load period. This is not a failure — it is information."};

  return(
    <div className="fade" style={{background:band.bg,border:`1px solid ${band.border}`,borderRadius:12,padding:"16px 20px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:longestGap>0?10:0}}>
        <div style={{flexShrink:0,textAlign:"center",minWidth:56}}>
          <div style={{fontFamily:"Syne",fontWeight:800,fontSize:32,color:band.color,lineHeight:1}}>{daysSinceLast}</div>
          <div style={{fontSize:9,letterSpacing:1.5,color:band.color,textTransform:"uppercase",marginTop:2}}>days since</div>
          <div style={{fontSize:9,letterSpacing:1,color:band.color,opacity:.7}}>last report</div>
        </div>
        <div style={{width:1,height:44,background:`${band.color}30`,flexShrink:0}}/>
        <div>
          <div style={{fontFamily:"Syne",fontWeight:700,fontSize:13,color:band.color,marginBottom:3}}>{band.label}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.6}}>{band.msg}</div>
        </div>
      </div>
      {longestGap>0&&<div style={{fontSize:11,color:C.muted,borderTop:`1px solid rgba(255,255,255,0.06)`,paddingTop:8}}>
        Your longest crisis-free window: <span style={{color:band.color,fontWeight:500}}>{longestGap} day{longestGap!==1?"s":""}</span>
      </div>}
    </div>
  );
}

// ── CLINICAL BRIEF GENERATOR ─────────────────────────────────────────────────
function generateBrief(entries){
  const sorted=[...entries].sort((a,b)=>new Date(a.submitted)-new Date(b.submitted));
  const latest=sorted[sorted.length-1];
  const topTriggers=countT(entries).slice(0,3).map(([t])=>t);
  const erVisits=entries.filter(e=>e.erVisit==="Yes");
  const violations=entries.filter(e=>e.erVisit==="Yes"&&(e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team"))));
  const avgP=entries.map(e=>e.pain).filter(p=>p>0);
  const avg=avgP.length?(avgP.reduce((a,b)=>a+b,0)/avgP.length).toFixed(1):"—";
  const gaps=[];
  for(let i=1;i<sorted.length;i++) gaps.push(days(sorted[i-1].submitted,sorted[i].submitted));
  const longestGap=gaps.length?Math.max(...gaps):0;
  const today=new Date().toISOString().slice(0,10);
  const daysSinceLast=days(sorted[sorted.length-1].submitted,today);

  // Stability band
  const pains=sorted.map(e=>e.pain).filter(p=>p>0);
  const firstHalf=pains.slice(0,Math.floor(pains.length/2));
  const secondHalf=pains.slice(Math.floor(pains.length/2));
  const avgFirst=firstHalf.length?firstHalf.reduce((a,b)=>a+b,0)/firstHalf.length:5;
  const avgSecond=secondHalf.length?secondHalf.reduce((a,b)=>a+b,0)/secondHalf.length:5;
  const painDelta=avgSecond-avgFirst;
  const avgGap=gaps.length?gaps.reduce((a,b)=>a+b,0)/gaps.length:30;
  const recentERRate=entries.slice(-3).filter(e=>e.erVisit==="Yes").length/Math.min(entries.length,3);
  let score=60;
  if(painDelta<-1)score+=15;else if(painDelta>1)score-=15;
  if(avgGap>21)score+=15;else if(avgGap<7)score-=15;
  if(!latest.ongoing)score+=10;else score-=10;
  if(recentERRate<0.33)score+=10;else if(recentERRate>0.66)score-=10;
  score=Math.max(10,Math.min(95,score));
  const stabilityLabel=score>=65?"STABLE":score>=40?"WATCHFUL":"HIGH LOAD";
  const stabilityColor=score>=65?"#22c55e":score>=40?"#f59e0b":"#ef4444";

  const erHistoryRows=erVisits.map(e=>{
    const viol=e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team"));
    return `<tr>
      <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;">${e.submitted}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;">${e.hospital||"—"}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;">${e.waitHours?e.waitHours+"h wait":""}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;color:${viol?"#dc2626":"#16a34a"};">${viol?"✗ Protocol NOT followed":"✓ Protocol followed"}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;">${e.admitted&&e.admitted!=="N/A"?e.admitted:""}</td>
    </tr>`;
  }).join("");

  const html=`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Hii Clinical Intelligence Brief — ${entries[0].warriorId}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111;background:#fff;padding:32px;max-width:780px;margin:0 auto;}
  .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #990000;padding-bottom:16px;margin-bottom:24px;}
  .brand{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#666;margin-bottom:4px;}
  .title{font-size:22px;font-weight:800;color:#0f0f0f;letter-spacing:-0.3px;}
  .subtitle{font-size:13px;color:#555;margin-top:3px;}
  .status-badge{padding:8px 18px;border-radius:6px;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;background:${stabilityColor}18;color:${stabilityColor};border:1.5px solid ${stabilityColor}50;text-align:center;}
  .section{margin-bottom:22px;}
  .section-header{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#990000;font-weight:700;margin-bottom:10px;padding-bottom:5px;border-bottom:1px solid #f3e8e8;}
  .row{display:flex;gap:8px;margin-bottom:6px;}
  .label{font-size:11px;color:#666;min-width:160px;flex-shrink:0;}
  .value{font-size:12px;color:#111;font-weight:500;}
  .trigger-chip{display:inline-block;padding:3px 10px;border-radius:12px;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;font-size:11px;margin-right:5px;margin-bottom:4px;}
  table{width:100%;border-collapse:collapse;margin-top:6px;}
  th{background:#f9fafb;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#666;padding:7px 10px;text-align:left;border-bottom:2px solid #e5e7eb;}
  .safeguard-note{background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:14px 16px;font-size:12px;color:#7f1d1d;line-height:1.7;}
  .footer{margin-top:28px;padding-top:14px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:flex-end;}
  .footer-left{font-size:10px;color:#999;line-height:1.7;}
  .footer-right{font-size:10px;color:#999;text-align:right;}
  .tagline{font-size:11px;color:#C1A004;font-weight:600;letter-spacing:.5px;}
  @media print{body{padding:20px;} .no-print{display:none;}}
</style>
</head>
<body>

<div class="header">
  <div>
    <div class="brand">Human Intelligence Infrastructure · Hii Clinical Brief</div>
    <div class="title">Clinical Intelligence Brief</div>
    <div class="subtitle">Warrior ID: ${entries[0].warriorId} &nbsp;·&nbsp; Generated: ${today} &nbsp;·&nbsp; ${entries.length} crisis report${entries.length!==1?"s":""} on record</div>
  </div>
  <div class="status-badge">${stabilityLabel}</div>
</div>

<div class="section">
  <div class="section-header">◈ Compass — Longitudinal Orientation</div>
  <div class="row"><span class="label">Crisis reports on record</span><span class="value">${entries.length}</span></div>
  <div class="row"><span class="label">Average pain level</span><span class="value">${avg}/10</span></div>
  <div class="row"><span class="label">Days since last report</span><span class="value">${daysSinceLast} days</span></div>
  ${longestGap>0?`<div class="row"><span class="label">Longest crisis-free window</span><span class="value">${longestGap} days</span></div>`:""}
  <div class="row"><span class="label">Current crisis status</span><span class="value">${latest.ongoing?"Active — crisis ongoing as of last report":"Resolved as of last report"}</span></div>
  <div class="row"><span class="label">Tracking for</span><span class="value">${entries[0].trackingFor}</span></div>
</div>

<div class="section">
  <div class="section-header">◈ Loop — Verified Trigger Patterns</div>
  <div class="row"><span class="label">Primary triggers identified</span><span class="value">${topTriggers.join(", ")||"—"}</span></div>
  <div style="margin-top:8px;">${topTriggers.map(t=>`<span class="trigger-chip">${t}</span>`).join("")}</div>
  ${latest.treatment.length?`<div class="row" style="margin-top:10px;"><span class="label">Current treatment</span><span class="value">${latest.treatment.join(", ")}</span></div>`:""}
  ${latest.working?`<div class="row"><span class="label">Treatment effectiveness</span><span class="value">${latest.working}</span></div>`:""}
</div>

<div class="section">
  <div class="section-header">◈ Safeguard — Protocol & Accountability History</div>
  ${erVisits.length?`
  <table>
    <thead><tr>
      <th>Date</th><th>Hospital</th><th>Wait</th><th>Protocol</th><th>Admission</th>
    </tr></thead>
    <tbody>${erHistoryRows}</tbody>
  </table>`:`<div style="font-size:12px;color:#666;padding:8px 0;">No ER visits on record for this Warrior.</div>`}
  ${violations.length?`
  <div class="safeguard-note" style="margin-top:12px;">
    <strong>${violations.length} documented protocol violation${violations.length!==1?"s":""} on record.</strong> This Warrior's experience is part of the community evidence base maintained by Sickle Cell Warriors of Buffalo. Protocol violations are logged for quality improvement reporting to hospital administrators and health equity partners.
  </div>`:""}
</div>

<div class="section">
  <div class="section-header">◈ Clinical Request</div>
  <div style="font-size:13px;line-height:1.8;color:#222;">
    This Warrior has documented expertise in managing their own crisis trajectory. Home management has been attempted. Clinical intervention is requested. Please initiate established Sickle Cell pain protocol immediately.<br/><br/>
    <strong>Community data indicates Warriors who are admitted report outcomes 2.5× better than those treated and released.</strong> Early admission and protocol adherence represent the highest-value clinical decision for this patient.
  </div>
</div>

<div class="footer">
  <div class="footer-left">
    Warrior Intelligence Project · Sickle Cell Warriors of Buffalo<br/>
    info@kindredcompassholdings.com · 716-818-2338<br/>
    warrior-intelligence-dashboard.vercel.app
  </div>
  <div class="footer-right">
    <div class="tagline">Our Pain. Our Data. Our Power.</div>
    <div style="margin-top:3px;">© ${new Date().getFullYear()} Jason Robert Moore. All Rights Reserved.<br/>Human Intelligence Infrastructure (Hii) Framework.</div>
  </div>
</div>

</body>
</html>`;

  const win=window.open("","_blank");
  win.document.write(html);
  win.document.close();
  setTimeout(()=>win.print(),500);
}

// ── WARRIOR PROFILE ───────────────────────────────────────────────────────────
function WarriorProfile({entries,onReset}){
  const sorted=[...entries].sort((a,b)=>new Date(a.submitted)-new Date(b.submitted));
  const topT=countT(entries).slice(0,3).map(([t])=>t);
  const erCount=entries.filter(e=>e.erVisit==="Yes").length;
  const violCount=entries.filter(e=>e.erVisit==="Yes"&&(e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team")))).length;
  const hasMenstrual=entries.some(e=>e.triggered.some(t=>t.includes("Menstrual")));
  const spanDays=entries.length>1?days(sorted[0].submitted,sorted[sorted.length-1].submitted):0;
  return(
    <div className="fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <button onClick={onReset} style={{background:"none",border:"none",color:C.muted,fontSize:13,display:"flex",alignItems:"center",gap:6,padding:0}}>← Search again</button>
        <button onClick={()=>generateBrief(entries)} style={{background:"none",border:`1px solid ${C.amber}50`,borderRadius:8,padding:"7px 16px",color:C.amber,fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:6}}>⬇ Export Clinical Brief</button>
      </div>
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:14,padding:24,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14,marginBottom:20}}>
          <div>
            <div style={{fontFamily:"Syne",fontWeight:800,fontSize:22,marginBottom:2}}>{entries[0].warriorId}</div>
            <div style={{fontSize:13,color:C.muted}}>{entries[0].community} · Tracking for {entries[0].trackingFor}{spanDays>0&&` · ${spanDays} days of data`}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:10,flex:1,maxWidth:420}}>
            <Pill label="Crises Logged" value={entries.length} accent={C.blue}/>
            <Pill label="Avg Pain" value={avgPain(entries)} accent={C.red}/>
            <Pill label="ER Visits" value={erCount} accent={C.amber}/>
            {violCount>0&&<Pill label="Violations" value={violCount} accent={C.red}/>}
          </div>
        </div>
        <StabilityScore entries={entries}/>
        <PatternMirror entries={entries}/>
      </div>
      <div style={{fontSize:10,letterSpacing:2.5,color:C.muted,textTransform:"uppercase",marginBottom:14}}>Crisis Timeline — oldest first</div>
      {sorted.map((e,i)=><Entry key={e.id} e={e} isLast={i===sorted.length-1}/>)}
    </div>
  );
}

// ── TIMELINE SEARCH ───────────────────────────────────────────────────────────
function TimelineView(){
  const [input,setInput]=useState("");
  const [phase,setPhase]=useState("idle");
  const [results,setResults]=useState(null);
  const [fuzzyOpts,setFuzzyOpts]=useState([]);
  function search(){
    if(!input.trim())return;
    const{exact,fuzzy}=findMatches(input.trim());
    if(exact.length){setResults(exact.flatMap(m=>m.entries));setPhase("found");}
    else if(fuzzy.length){setFuzzyOpts(fuzzy);setPhase("confirm");}
    else setPhase("notfound");
  }
  function reset(){setInput("");setPhase("idle");setResults(null);setFuzzyOpts([]);}
  if(phase==="found"&&results)return<WarriorProfile entries={results} onReset={reset}/>;
  return(
    <div>
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:16,padding:32,marginBottom:20}}>
        <div style={{fontFamily:"Syne",fontWeight:800,fontSize:24,marginBottom:6,letterSpacing:-.3}}>Your Crisis <span style={{color:C.red}}>Timeline</span></div>
        <div style={{fontSize:14,color:C.muted,marginBottom:26,lineHeight:1.7,maxWidth:560}}>Every crisis you've logged — your triggers, your ER encounters, your patterns — in one place. Enter your Warrior ID to access your data.</div>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <input value={input} onChange={e=>{setInput(e.target.value);if(phase!=="idle")setPhase("idle");}} onKeyDown={e=>e.key==="Enter"&&search()} placeholder="Enter your Warrior ID" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" style={{flex:1,background:C.surf2,border:`1px solid ${phase==="notfound"?C.red+"50":C.border}`,borderRadius:10,padding:"13px 18px",color:C.text,fontSize:14,transition:"border .2s"}}/>
          <button onClick={search} style={{background:C.red,color:"#fff",border:"none",borderRadius:10,padding:"13px 28px",fontWeight:500,fontSize:14}}>Find Me</button>
        </div>
        <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>Warrior ID format: first name + birth month + favorite number. We never store real names. Your data is yours.</div>
      </div>
      {phase==="confirm"&&<div className="fade" style={{background:C.surf,border:`1px solid ${C.amber}30`,borderRadius:14,padding:24,marginBottom:16}}><div style={{fontFamily:"Syne",fontWeight:700,color:C.amber,marginBottom:4}}>Did you mean one of these?</div><div style={{fontSize:13,color:C.muted,marginBottom:16}}>We couldn't find an exact match for "<strong style={{color:C.text}}>{input}</strong>" but found similar IDs:</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{fuzzyOpts.map(opt=>(<button key={opt.warriorId} onClick={()=>{setResults([...opt.entries]);setPhase("found");}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.surf2,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 18px",color:C.text,textAlign:"left"}}><div><div style={{fontWeight:500,fontSize:15,marginBottom:2}}>{opt.warriorId}</div><div style={{fontSize:12,color:C.muted}}>{opt.entries[0].community} · {opt.entries.length} submission{opt.entries.length>1?"s":""}</div></div><span style={{color:C.amber,fontSize:13}}>This is me →</span></button>))}</div><button onClick={()=>setPhase("idle")} style={{background:"none",border:"none",color:C.muted,fontSize:12,marginTop:12,padding:0}}>← None of these are me</button></div>}
      {phase==="notfound"&&<div className="fade" style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:14,padding:28,textAlign:"center"}}><div style={{fontSize:28,marginBottom:10}}>🔍</div><div style={{fontFamily:"Syne",fontWeight:700,fontSize:17,marginBottom:8}}>No match for "{input}"</div><div style={{fontSize:13,color:C.muted,lineHeight:1.7,maxWidth:380,margin:"0 auto"}}>Double-check your format: first name + birth month + favorite number.<br/>If you haven't submitted yet, your ID won't be in the system.</div></div>}
    </div>
  );
}

// ── COMMUNITY VIEW ────────────────────────────────────────────────────────────
function CommunityView(){
  const triggers=countT(RAW);
  const maxT=triggers[0]?.[1]||1;
  const erVisits=RAW.filter(d=>d.erVisit==="Yes");
  const violations=allViolations();
  const menstrual=RAW.filter(d=>d.triggered.some(t=>t.includes("Menstrual")));
  const consented=RAW.filter(d=>d.consented);
  const withAge=RAW.filter(d=>d.age);
  return(
    <div className="fade">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:24}}>
        <Pill label="Total Reports" value={RAW.length} accent={C.blue} sub="Dec 2025 – Mar 2026"/>
        <Pill label="Avg Pain" value={avgPain(RAW)} accent={C.red} sub="Across all crises"/>
        <Pill label="ER Visits" value={erVisits.length} accent={C.amber}/>
        <Pill label="Protocol Violations" value={`${Math.round(violations.length/erVisits.length*100)}%`} accent={C.red} sub={`${violations.length} of ${erVisits.length} ER visits`}/>
        <Pill label="Menstrual Trigger" value={`${Math.round(menstrual.length/RAW.length*100)}%`} accent={C.purple} sub={`${menstrual.length} Warriors`}/>
        <Pill label="Consented" value={consented.length} accent={C.teal} sub="Under new framework"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
          <div style={{fontFamily:"Syne",fontWeight:700,marginBottom:3}}>Crisis Triggers</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:18}}>Reported 24–48 hrs before onset</div>
          {triggers.map(([label,count])=>{
            const pct=Math.round(count/RAW.length*100);
            const isMen=label==="Menstrual Cycle";
            return(<div key={label} style={{marginBottom:11}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:13,color:isMen?C.purple:C.text}}>{label}{isMen&&<span style={{marginLeft:6,fontSize:10,background:`${C.purple}18`,color:C.purple,padding:"1px 6px",borderRadius:4}}>COMMUNITY IDENTIFIED</span>}</span><span style={{fontSize:12,color:C.muted}}>{count} ({pct}%)</span></div><div style={{height:5,background:"rgba(255,255,255,0.05)",borderRadius:3}}><div style={{height:"100%",width:`${Math.round(count/maxT*100)}%`,background:isMen?C.purple:C.blue,borderRadius:3}}/></div></div>);
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:`${C.red}0a`,border:`1px solid ${C.red}25`,borderRadius:14,padding:20,flex:1}}>
            <div style={{fontFamily:"Syne",fontWeight:700,color:C.red,marginBottom:6,fontSize:14}}>Systemic Pattern: Addict Stigma</div>
            <div style={{fontSize:13,lineHeight:1.75,color:"rgba(255,255,255,0.7)"}}>{Math.round(violations.length/erVisits.length*100)}% of ER visits ended in protocol violations. Warriors are denied admission despite documented pain protocols — clinical teams citing addiction risk over lived experience.</div>
            <div style={{marginTop:12,fontSize:12,color:C.red,fontStyle:"italic",borderLeft:`2px solid ${C.red}40`,paddingLeft:10}}>"I hate being treated as an addict rather than a patient."</div>
          </div>
          <div style={{background:`${C.purple}0a`,border:`1px solid ${C.purple}25`,borderRadius:14,padding:20,flex:1}}>
            <div style={{fontFamily:"Syne",fontWeight:700,color:C.purple,marginBottom:6,fontSize:14}}>Community-Identified: Menstrual Trigger</div>
            <div style={{fontSize:13,lineHeight:1.75,color:"rgba(255,255,255,0.7)"}}>{menstrual.length} Warriors ({Math.round(menstrual.length/RAW.length*100)}%) cite menstrual cycle as a trigger. Community data identified this pattern in under 10 days — demonstrating the speed of real-time lived-experience intelligence.</div>
          </div>
          {consented.length>0&&<div style={{background:`${C.teal}0a`,border:`1px solid ${C.teal}25`,borderRadius:14,padding:20}}>
            <div style={{fontFamily:"Syne",fontWeight:700,color:C.teal,marginBottom:6,fontSize:14}}>Consent Framework Active</div>
            <div style={{fontSize:13,lineHeight:1.75,color:"rgba(255,255,255,0.7)"}}>{consented.length} submission{consented.length>1?"s":""} under the new informed consent framework. Every future submission is explicitly authorized for community briefs, hospital partnerships, and academic research.</div>
          </div>}
        </div>
      </div>
    </div>
  );
}

// ── ACCOUNTABILITY VIEW ───────────────────────────────────────────────────────
function AccountabilityView(){
  const violations=allViolations();
  const erVisits=RAW.filter(d=>d.erVisit==="Yes");
  const waits=erVisits.filter(d=>d.waitHours>0);
  const avgWait=waits.length?(waits.reduce((s,d)=>s+d.waitHours,0)/waits.length).toFixed(1):"—";
  return(
    <div className="fade">
      <div style={{background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:14,padding:20,marginBottom:20}}>
        <div style={{fontFamily:"Syne",fontWeight:700,color:C.red,marginBottom:6}}>Community-Owned Evidence</div>
        <div style={{fontSize:13,lineHeight:1.75,color:"rgba(255,255,255,0.7)"}}>These records document systemic patterns, not individual accusations. Protocol deviations represent design failures in how healthcare systems treat SCD patients. This data belongs to Warriors for advocacy, hospital quality improvement conversations, and policy reform.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        <Pill label="ER Visits" value={erVisits.length} accent={C.blue}/>
        <Pill label="Violation Rate" value={`${Math.round(violations.length/erVisits.length*100)}%`} accent={C.red} sub={`${violations.length} incidents`}/>
        <Pill label="Avg Wait" value={`${avgWait}h`} accent={C.amber}/>
      </div>
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
        <div style={{fontFamily:"Syne",fontWeight:700,marginBottom:3}}>Documented Protocol Violations</div>
        <div style={{fontSize:12,color:C.muted,marginBottom:18}}>{violations.length} incidents on record · Community-owned · For quality improvement conversations only</div>
        {violations.map(v=>(
          <div key={v.id} style={{padding:"14px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,flexWrap:"wrap",gap:4}}>
              <span style={{fontWeight:500,fontSize:14}}>Warrior — {v.community}</span>
              <span style={{fontSize:11,color:C.muted}}>{v.submitted}</span>
            </div>
            <div style={{fontSize:13,marginBottom:4}}><span style={{color:C.red}}>🏥 {v.hospital||"Unknown"} </span><span style={{color:C.muted}}>· {v.waitHours>0?`${v.waitHours}h wait`:"wait not recorded"} · Pain {v.pain}/10</span></div>
            {v.whyNot&&<div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>Reason given: {v.whyNot}</div>}
            {v.notes&&<div style={{marginTop:6,fontSize:12,fontStyle:"italic",color:C.amber,borderLeft:`2px solid ${C.amber}40`,paddingLeft:10}}>"{v.notes}"</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("timeline");
  const [liveData,setLiveData]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    fetchWarriorData()
      .then(data=>{ setLiveData(data); setLoading(false); })
      .catch(()=>{ setLiveData(RAW); setLoading(false); });
  },[]);

  const data = liveData || RAW;
  // Inject live data into global RAW reference used by child components
  RAW.length = 0;
  data.forEach(d => RAW.push(d));

  const tabs=[{id:"timeline",label:"My Timeline"},{id:"community",label:"Community Patterns"},{id:"accountability",label:"ER Accountability"}];
  return(
    <>
      <style>{css}</style>
      <div style={{minHeight:"100vh",background:C.bg}}>
        <div style={{borderBottom:`1px solid ${C.border}`,padding:"0 24px",position:"sticky",top:0,background:C.bg,zIndex:10}}>
          <div style={{maxWidth:860,margin:"0 auto"}}>
            <div style={{paddingTop:20}}>
              <div style={{fontSize:10,letterSpacing:3.5,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Human Intelligence Infrastructure</div>
              <div style={{fontFamily:"Syne",fontWeight:800,fontSize:21,letterSpacing:-.3,marginBottom:2}}>Warrior Intelligence <span style={{color:C.red}}>Dashboard</span></div>
              <div style={{fontSize:12,color:C.muted,marginBottom:14}}>
                {loading ? "Loading live data..." : `${data.length} crisis reports · Dec 2025 – present · Community-owned · ${data.filter(d=>d.consented).length} consented`}
                {!loading && <span className="live" style={{marginLeft:8,color:C.teal,fontSize:10}}>● LIVE</span>}
              </div>
            </div>
            <div style={{display:"flex",gap:0}}>{tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",padding:"10px 20px",fontSize:13,fontWeight:tab===t.id?500:400,color:tab===t.id?C.text:C.muted,borderBottom:tab===t.id?`2px solid ${C.red}`:"2px solid transparent",transition:"all .2s"}}>{t.label}</button>))}</div>
          </div>
        </div>
        <div style={{maxWidth:860,margin:"0 auto",padding:"28px 24px"}}>
          {loading && <div style={{textAlign:"center",paddingTop:80,color:C.muted,fontSize:14}}>Loading Warrior data...</div>}
          {!loading && tab==="timeline"&&<TimelineView/>}
          {!loading && tab==="community"&&<CommunityView/>}
          {!loading && tab==="accountability"&&<AccountabilityView/>}
        </div>
      </div>
    </>
  );
}

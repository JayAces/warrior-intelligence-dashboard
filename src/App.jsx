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
    waitHours: r.wait_hours != null ? r.wait_hours : 0,
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
    hydrationOz: r.hydration_oz ? Number(r.hydration_oz) : null,
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
const fmtWait=w=>{
  if(!w||w===0||w==="0")return null;
  if(typeof w==="string"){
    if(w.includes("min"))return w;
    if(w.includes("hour"))return w;
    const n=parseFloat(w);
    if(!isNaN(n)&&n>0){if(n<1)return`${Math.round(n*60)} min wait`;return`${n}h wait`;}
    return w; // return as-is for strings like "31-60 mins"
  }
  if(typeof w==="number"&&w>0){if(w<1)return`${Math.round(w*60)} min wait`;return`${w}h wait`;}
  return null;
}; 
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
function Entry({e,isLast,onResolve}){
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
          {e.erVisit==="Yes"&&<div style={{marginTop:8,padding:"10px 14px",borderRadius:8,background:viol?`${C.red}0c`:`${C.green}0a`,border:`1px solid ${viol?C.red+"28":C.green+"25"}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4,marginBottom:4}}><span style={{fontSize:13,fontWeight:500}}>🏥 {e.hospital||"ER Visit"}</span>{fmtWait(e.waitHours)&&<span style={{fontSize:11,color:C.muted}}>{fmtWait(e.waitHours)}</span>}</div><div style={{fontSize:12,color:viol?C.red:C.green}}>{viol?`✗ Protocol NOT followed${e.whyNot?` — ${e.whyNot}`:""}`:e.protocolFollowed==="Yes"?"✓ Protocol followed":e.protocolFollowed==="No protocol"?"⚠ No protocol on file":"Protocol status unclear"}</div>{e.admitted&&e.admitted!=="N/A"&&<div style={{fontSize:11,color:C.muted,marginTop:3}}>Admission: {e.admitted}</div>}</div>}
          {e.outcome72h&&<div style={{marginTop:8,padding:"8px 12px",borderRadius:8,background:`${C.green}0a`,border:`1px solid ${C.green}25`,fontSize:12,color:C.green}}>72h outcome: {e.outcome72h}</div>}
          {e.notes&&<div style={{marginTop:10,fontSize:12,fontStyle:"italic",color:C.muted,borderLeft:`2px solid ${C.amber}50`,paddingLeft:10,lineHeight:1.6}}>"{e.notes}"</div>}
          {e.ongoing&&onResolve&&(
            <div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
              <button onClick={()=>onResolve(e.submission_id||e.id, e.warriorId)} style={{background:"none",border:`1px solid ${C.green}40`,borderRadius:8,padding:"7px 14px",color:C.green,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                ✓ Mark this crisis as resolved
              </button>
            </div>
          )}
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
    insight=`Your most consistent trigger: ${topCombo[0]} — appeared in every report you've submitted (${entries.length} report${entries.length!==1?'s':''}).`;
  }

  const lines=[];
  if(insight) lines.push({text:insight, color:C.amber});
  if(hasMenstrual) lines.push({text:"Menstrual cycle is a documented trigger in your data — you identified this before most clinical systems would catch it.", color:C.purple});
  if(violCount>0) lines.push({text:`${violCount} protocol violation${violCount>1?"s":""} on record. Your experience is part of the community evidence base.`, color:C.red});
  // Hydration correlation insight
  const hydrationEntries=entries.filter(e=>e.hydrationOz!=null);
  if(hydrationEntries.length>=2){
    const crisisEntries=hydrationEntries.filter(e=>e.pain>=7);
    const stableEntries=hydrationEntries.filter(e=>e.pain<7);
    const avgHydCrisis=crisisEntries.length?Math.round(crisisEntries.reduce((a,b)=>a+b.hydrationOz,0)/crisisEntries.length):null;
    const avgHydStable=stableEntries.length?Math.round(stableEntries.reduce((a,b)=>a+b.hydrationOz,0)/stableEntries.length):null;
    if(avgHydCrisis&&avgHydStable&&avgHydStable>avgHydCrisis+8){
      lines.push({text:`Your crises average ${avgHydCrisis}oz of water the day before — compared to ${avgHydStable}oz on lower-pain days. Hydration is a measurable factor in your pattern.`, color:C.blue});
    } else if(avgHydCrisis&&avgHydCrisis<48){
      lines.push({text:`Your pre-crisis hydration averaged ${avgHydCrisis}oz — below the recommended daily intake. Dehydration may be an underreported factor in your crises.`, color:C.blue});
    }
  }

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
          <div style={{fontSize:9,letterSpacing:1.5,color:band.color,textTransform:"uppercase",marginTop:2}}>day stability</div>
          <div style={{fontSize:9,letterSpacing:1,color:band.color,opacity:.7}}>window</div>
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
  const triggerCounts=countT(entries); // [[label,count],...]
  const primaryTrigger=triggerCounts[0]?triggerCounts[0][0]:"—";
  const secondaryTrigger=triggerCounts[1]?triggerCounts[1][0]:null;
  const emergingTrigger=triggerCounts[2]?triggerCounts[2][0]:null;
  const hasMenstrual=entries.some(e=>e.triggered&&e.triggered.some(t=>t.includes("Menstrual")));
  const erVisits=entries.filter(e=>e.erVisit==="Yes");
  const violations=entries.filter(e=>e.erVisit==="Yes"&&(e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team"))));
  const avgP=entries.map(e=>e.pain).filter(p=>p>0);
  const avg=avgP.length?(avgP.reduce((a,b)=>a+b,0)/avgP.length).toFixed(1):"—";
  const gaps=[];
  for(let i=1;i<sorted.length;i++) gaps.push(days(sorted[i-1].submitted,sorted[i].submitted));
  const longestGap=gaps.length?Math.max(...gaps):0;
  const today=new Date().toISOString().slice(0,10);
  const daysSinceLast=days(sorted[sorted.length-1].submitted,today);
  const totalReports=entries.length;

  // Community percentages for top trigger
  const communityTriggers={"Cold Weather":73,"High Stress":46,"Lack of Sleep":31,"Dehydration":26,"Illness/Infection":24,"Menstrual Cycle":21,"Overexertion":18};
  const communityPct=communityTriggers[primaryTrigger]||null;

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
  if(!latest.ongoing && daysSinceLast>30)score+=20;
  else if(!latest.ongoing && daysSinceLast>14)score+=10;
  score=Math.max(10,Math.min(95,score));
  const stabilityLabel=score>=65?"STABLE":score>=40?"WATCHFUL":"HIGH LOAD";
  const stabilityColor=score>=65?"#16a34a":score>=40?"#d97706":"#dc2626";

  // Home treatment attempted (from latest entry)
  const homeTx=latest.treatment.filter(t=>!t.toLowerCase().includes("prescription")&&!t.toLowerCase().includes("morphine")).join(", ");
  const homeFailed=latest.working==="Not at all"||latest.working==="A little";

  const erHistoryRows=erVisits.map(e=>{
    const viol=e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team"));
    return `<tr>
      <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;">${e.submitted}</td>
      <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;">${e.hospital||"—"}</td>
      <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;">${e.waitHours?e.waitHours+"h":""}</td>
      <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:600;color:${viol?"#dc2626":"#16a34a"};">${viol?"✗ NOT FOLLOWED":"✓ Followed"}</td>
      <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;font-size:11px;color:#555;">${viol&&e.whyNot?e.whyNot:""}</td>
    </tr>`;
  }).join("");

  const html=`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Hii Clinical Intelligence Brief — ${entries[0].warriorId}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111;background:#fff;padding:28px 32px;max-width:780px;margin:0 auto;font-size:13px;}
  .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #990000;padding-bottom:14px;margin-bottom:20px;}
  .brand{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#888;margin-bottom:3px;}
  .title{font-size:20px;font-weight:800;color:#0f0f0f;letter-spacing:-0.3px;}
  .subtitle{font-size:12px;color:#555;margin-top:4px;line-height:1.6;}
  .status-badge{padding:10px 20px;border-radius:6px;font-weight:800;font-size:14px;letter-spacing:1.5px;text-transform:uppercase;background:${stabilityColor}15;color:${stabilityColor};border:2px solid ${stabilityColor}40;text-align:center;min-width:110px;}
  .section{margin-bottom:18px;page-break-inside:avoid;}
  .section-header{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#990000;font-weight:800;margin-bottom:8px;padding-bottom:5px;border-bottom:1.5px solid #fce8e8;display:flex;align-items:center;gap:6px;}
  .row{display:flex;gap:8px;margin-bottom:5px;align-items:baseline;}
  .label{font-size:11px;color:#777;min-width:170px;flex-shrink:0;}
  .value{font-size:12px;color:#111;font-weight:600;}
  .trigger-rank{display:flex;flex-direction:column;gap:6px;margin-top:6px;}
  .trigger-row{display:flex;align-items:center;gap:10px;}
  .trigger-badge{font-size:9px;letter-spacing:1px;text-transform:uppercase;padding:2px 7px;border-radius:3px;font-weight:700;flex-shrink:0;min-width:68px;text-align:center;}
  .primary-badge{background:#fef3c7;color:#92400e;border:1px solid #fde68a;}
  .secondary-badge{background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;}
  .emerging-badge{background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;}
  .trigger-name{font-size:12px;font-weight:600;color:#111;}
  .trigger-count{font-size:11px;color:#888;}
  .community-bar{display:flex;align-items:center;gap:8px;margin-top:8px;padding:8px 12px;background:#f9fafb;border-radius:6px;border:1px solid #e5e7eb;}
  table{width:100%;border-collapse:collapse;margin-top:8px;}
  th{background:#f9fafb;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#888;padding:7px 10px;text-align:left;border-bottom:2px solid #e5e7eb;}
  .safeguard-box{background:#fff1f2;border:1.5px solid #fecdd3;border-radius:6px;padding:12px 14px;font-size:12px;color:#7f1d1d;line-height:1.7;margin-top:10px;}
  .request-box{background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:6px;padding:14px 16px;font-size:12px;line-height:1.8;color:#0c4a6e;}
  .cost-box{background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:10px 14px;font-size:11px;color:#78350f;line-height:1.7;margin-top:10px;}
  .footer{margin-top:20px;padding-top:12px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:flex-end;}
  .footer-left{font-size:10px;color:#aaa;line-height:1.8;}
  .footer-right{text-align:right;}
  .tagline{font-size:11px;color:#C1A004;font-weight:700;letter-spacing:.5px;}
  .copyright{font-size:9px;color:#bbb;margin-top:2px;}
  .menstrual-flag{background:#fdf4ff;border:1px solid #e9d5ff;border-radius:5px;padding:7px 12px;font-size:11px;color:#6b21a8;margin-top:8px;line-height:1.6;}
  @media print{body{padding:16px 20px;} .no-print{display:none;} .section{page-break-inside:avoid;}}
</style>
</head>
<body>

<div class="header">
  <div>
    <div class="brand">Human Intelligence Infrastructure · Warrior Intelligence Project</div>
    <div class="title">Hii Clinical Intelligence Brief</div>
    <div class="subtitle">
      Warrior ID: <strong>${entries[0].warriorId}</strong> &nbsp;·&nbsp; Generated: ${today}<br/>
      ${totalReports} crisis report${totalReports!==1?"s":""} on record &nbsp;·&nbsp; Tracking for: ${entries[0].trackingFor}
    </div>
  </div>
  <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
    <div class="status-badge">${stabilityLabel}</div>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&color=990000&bgcolor=ffffff&data=https://warrior-intelligence-dashboard.vercel.app" width="72" height="72" style="border:1px solid #e5e7eb;border-radius:4px;display:block;" alt="QR"/>
    <div style="font-size:8px;color:#aaa;text-align:right;margin-top:2px;">Scan to verify live data</div>
  </div>
</div>

<div class="section">
  <div class="section-header">◈ &nbsp;Compass &nbsp;—&nbsp; Longitudinal Orientation</div>
  <div class="row"><span class="label">Baseline stability window</span><span class="value">${daysSinceLast} days since last crisis report</span></div>
  ${longestGap>0?`<div class="row"><span class="label">Longest recorded window</span><span class="value">${longestGap} days</span></div>`:""}
  <div class="row"><span class="label">Current trajectory</span><span class="value">${latest.crisisStart?`Started ${latest.crisisStart}`:""} ${latest.ongoing?"— Active crisis":"— Resolved"}</span></div>
  <div class="row"><span class="label">Pain intensity (last report)</span><span class="value">${latest.pain}/10 &nbsp;·&nbsp; ${normPC(latest.painCompared)||""}</span></div>
  <div class="row"><span class="label">Average pain (all reports)</span><span class="value">${avg}/10</span></div>
  ${homeTx?`<div class="row"><span class="label">Home management attempted</span><span class="value">${homeTx}</span></div>`:""}
  ${latest.hydrationOz!=null?`<div class="row"><span class="label">Pre-crisis hydration (logged)</span><span class="value">${latest.hydrationOz}oz in 24hrs prior${latest.hydrationOz<40?' <span style="color:#dc2626;font-size:11px;">— below threshold</span>':latest.hydrationOz>=64?' <span style="color:#16a34a;font-size:11px;">— adequate</span>':' <span style="color:#d97706;font-size:11px;">— borderline</span>'}</span></div>`:""}
  ${homeFailed?`<div class="row"><span class="label">Home treatment response</span><span class="value" style="color:#dc2626;">${latest.working} — home titration has reached its limit</span></div>`:""}
  <div style="margin-top:8px;padding:8px 12px;background:#f8fafc;border-radius:5px;border:1px solid #e2e8f0;font-size:11px;color:#334155;line-height:1.7;">
    <strong>Clinical context:</strong> This patient is an expert navigator of their own maintenance pattern.
    ${latest.ongoing?"This visit represents a deviation from baseline — home-titration failure is indicated.":"Crisis resolved. This brief documents the completed episode for clinical record."}
  </div>
</div>

<div class="section">
  <div class="section-header">◈ &nbsp;Loop &nbsp;—&nbsp; Verified Trigger Patterns</div>
  <div class="trigger-rank">
    ${triggerCounts[0]?`<div class="trigger-row"><span class="trigger-badge primary-badge">Primary</span><span class="trigger-name">${triggerCounts[0][0]}</span><span class="trigger-count">(${triggerCounts[0][1]} of ${totalReports} report${totalReports!==1?"s":""})</span></div>`:""}
    ${triggerCounts[1]?`<div class="trigger-row"><span class="trigger-badge secondary-badge">Secondary</span><span class="trigger-name">${triggerCounts[1][0]}</span><span class="trigger-count">(${triggerCounts[1][1]} of ${totalReports} report${totalReports!==1?"s":""})</span></div>`:""}
    ${triggerCounts[2]?`<div class="trigger-row"><span class="trigger-badge emerging-badge">Emerging</span><span class="trigger-name">${triggerCounts[2][0]}</span><span class="trigger-count">(${triggerCounts[2][1]} of ${totalReports} report${totalReports!==1?"s":""})</span></div>`:""}
  </div>
  ${communityPct?`<div class="community-bar"><span style="font-size:11px;color:#555;"><strong style="color:#111;">${primaryTrigger}</strong> affects <strong>${communityPct}%</strong> of the broader Warrior community (78 Warriors, 17 states). This patient's pattern aligns with a verified population signal.</span></div>`:""}
  ${hasMenstrual?`<div class="menstrual-flag">⚠ <strong>Hormonal Trigger Identified:</strong> Menstrual cycle is a documented crisis trigger for this patient — a signal largely absent from standard ER triage intake protocols. Community data surfaced this pattern in under 10 days across 78 Warriors.</div>`:""}
  ${latest.treatment.length?`<div class="row" style="margin-top:10px;"><span class="label">Current treatment</span><span class="value">${latest.treatment.join(", ")}</span></div>`:""}
</div>

<div class="section">
  <div class="section-header">◈ &nbsp;Safeguard &nbsp;—&nbsp; Protocol & Accountability History</div>
  ${erVisits.length?`
  <table>
    <thead><tr><th>Date</th><th>Hospital</th><th>Wait</th><th>Protocol Status</th><th>Reason (if not followed)</th></tr></thead>
    <tbody>${erHistoryRows}</tbody>
  </table>`:`<div style="font-size:12px;color:#777;padding:6px 0;">No ER visits on record for this Warrior.</div>`}
  ${violations.length?`<div class="safeguard-box" style="margin-top:10px;"><strong>${violations.length} documented protocol violation${violations.length!==1?"s":""} on record.</strong> These encounters are logged in the Warrior Intelligence Project community evidence base — maintained by Sickle Cell Warriors of Buffalo for quality improvement reporting, health equity advocacy, and institutional partnership conversations.</div>`:""}
</div>

<div class="section">
  <div class="section-header">◈ &nbsp;Clinical Request</div>
  <div class="request-box">
    This patient has documented expertise in managing their own crisis trajectory. Home management has been attempted and ${homeFailed?"has reached its limit":"is supplementary to this visit"}. <strong>Please initiate established Sickle Cell pain protocol immediately.</strong><br/><br/>
    Community data from 78 Warriors indicates patients who are admitted report outcomes <strong>2.5× better</strong> than those treated and released. Early protocol initiation and admission consideration represent the highest-value clinical decisions for this patient profile.
  </div>
  <div class="cost-box">
    <strong>Systemic Risk & Cost Context:</strong> Research (Shah et al., 2020) estimates mean annual SCD-related costs at <strong>~$59,000 per patient</strong> — largely driven by acute crisis mismanagement and ineffective treat-and-release cycles. Protocol adherence at this visit directly affects that trajectory.
  </div>
</div>

<div class="footer">
  <div class="footer-left">
    Warrior Intelligence Project &nbsp;·&nbsp; Sickle Cell Warriors of Buffalo<br/>
    info@kindredcompassholdings.com &nbsp;·&nbsp; 716-818-2338<br/>
    warrior-intelligence-dashboard.vercel.app
  </div>
  <div class="footer-right">
    <div class="tagline">Our Pain. Our Data. Our Power.</div>
    <div class="copyright">© ${new Date().getFullYear()} Jason Robert Moore. All Rights Reserved.<br/>Human Intelligence Infrastructure (Hii) Framework.</div>
  </div>
</div>

</body>
</html>`;

  const win=window.open("","_blank");
  if(win){
    win.document.open();
    win.document.write(html);
    win.document.close();
    setTimeout(()=>{ try{win.print();}catch(e){} },900);
  } else {
    // Fallback for mobile popup blockers — open in same tab
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.target="_blank";
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
}

// ── PROTOCOL BUILDER ─────────────────────────────────────────────────────────
function ProtocolBuilder({entries, onClose}){
  const [form,setForm]=useState({
    preferredMeds:"",
    stepUpMeds:"",
    allergies:"",
    hematologistName:"",
    hematologistPhone:"",
    emergencyContact:"",
    emergencyPhone:"",
    additionalNotes:"",
  });

  const sorted=[...entries].sort((a,b)=>new Date(a.submitted)-new Date(b.submitted));
  const avgP=entries.map(e=>e.pain).filter(p=>p>0);
  const avgPain=avgP.length?(avgP.reduce((a,b)=>a+b,0)/avgP.length).toFixed(1):"—";
  const triggerCounts=countT(entries);
  const topTriggers=triggerCounts.slice(0,3).map(([t])=>t);
  const effectiveTx=entries.filter(e=>e.working==="Well"||e.working==="Moderately").flatMap(e=>e.treatment);
  const ineffectiveTx=entries.filter(e=>e.working==="Not at all").flatMap(e=>e.treatment);
  const uniqueEffective=[...new Set(effectiveTx)].filter(t=>!t.includes("Nothing"));
  const uniqueIneffective=[...new Set(ineffectiveTx)].filter(t=>!t.includes("Nothing"));
  const today=new Date().toISOString().slice(0,10);

  function update(k,v){setForm(f=>({...f,[k]:v}));}

  function generateProtocol(){
    const html=`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>SCD Pain Protocol Request — ${entries[0].warriorId}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111;background:#fff;padding:28px 32px;max-width:780px;margin:0 auto;font-size:13px;}
  .header{border-bottom:3px solid #990000;padding-bottom:14px;margin-bottom:20px;}
  .brand{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#888;margin-bottom:3px;}
  .title{font-size:20px;font-weight:800;color:#0f0f0f;letter-spacing:-0.3px;}
  .subtitle{font-size:12px;color:#555;margin-top:4px;line-height:1.6;}
  .intro-box{background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:6px;padding:14px 16px;font-size:12px;line-height:1.8;color:#0c4a6e;margin-bottom:20px;}
  .section{margin-bottom:18px;page-break-inside:avoid;}
  .section-header{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#990000;font-weight:800;margin-bottom:8px;padding-bottom:5px;border-bottom:1.5px solid #fce8e8;}
  .row{display:flex;gap:8px;margin-bottom:5px;align-items:baseline;}
  .label{font-size:11px;color:#777;min-width:180px;flex-shrink:0;}
  .value{font-size:12px;color:#111;font-weight:600;}
  .tag{display:inline-block;padding:2px 9px;border-radius:12px;font-size:11px;margin-right:4px;margin-bottom:3px;}
  .trigger-tag{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;}
  .effective-tag{background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;}
  .ineffective-tag{background:#fff1f2;color:#7f1d1d;border:1px solid #fecdd3;}
  .sign-box{margin-top:28px;padding:16px;border:1.5px dashed #d1d5db;border-radius:6px;background:#fafafa;}
  .sign-row{display:flex;gap:40px;margin-top:16px;}
  .sign-field{flex:1;}
  .sign-line{border-bottom:1px solid #374151;margin-top:24px;margin-bottom:4px;}
  .sign-label{font-size:10px;color:#6b7280;letter-spacing:.5px;}
  .fill-line{border-bottom:1px solid #9ca3af;min-width:200px;display:inline-block;margin-left:8px;margin-bottom:2px;}
  .fill-section{background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:14px 16px;margin-top:8px;}
  .fill-row{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;}
  .fill-label{font-size:11px;color:#374151;min-width:160px;flex-shrink:0;font-weight:500;}
  .fill-value{font-size:12px;color:#111;font-weight:600;border-bottom:1px solid #d1d5db;flex:1;padding-bottom:2px;min-height:18px;}
  .footer{margin-top:20px;padding-top:12px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:flex-end;}
  .tagline{font-size:11px;color:#C1A004;font-weight:700;letter-spacing:.5px;}
  .copyright{font-size:9px;color:#bbb;margin-top:2px;}
  @media print{body{padding:16px 20px;} .no-print{display:none;}}
</style>
</head>
<body>

<div class="header">
  <div class="brand">Human Intelligence Infrastructure · Warrior Intelligence Project · Sickle Cell Warriors of Buffalo</div>
  <div class="title">Sickle Cell Disease Pain Protocol Request</div>
  <div class="subtitle">Prepared for clinical review &nbsp;·&nbsp; Warrior ID: <strong>${entries[0].warriorId}</strong> &nbsp;·&nbsp; Generated: ${today}</div>
</div>

<div class="intro-box">
  <strong>To the treating clinician:</strong> This document has been prepared by the patient using the Warrior Intelligence Project — a community-owned, real-time SCD crisis tracking system maintained by Sickle Cell Warriors of Buffalo. The patient is requesting that you review the information below, adapt as clinically appropriate, and establish a signed SCD Pain Protocol for use in future emergency visits. A signed protocol on file significantly reduces time-to-analgesia and improves outcomes for this patient population.
</div>

<div class="section">
  <div class="section-header">◈ &nbsp;Patient Baseline — From Crisis Tracking Data</div>
  <div class="row"><span class="label">Warrior ID (anonymous)</span><span class="value">${entries[0].warriorId}</span></div>
  <div class="row"><span class="label">Crisis reports on record</span><span class="value">${entries.length} report${entries.length!==1?"s":""}</span></div>
  <div class="row"><span class="label">Average pain level at crisis</span><span class="value">${avgPain}/10</span></div>
  <div class="row"><span class="label">Tracking for</span><span class="value">${entries[0].trackingFor}</span></div>
  ${topTriggers.length?`
  <div style="margin-top:8px;">
    <div class="label" style="margin-bottom:5px;">Documented primary triggers</div>
    ${topTriggers.map(t=>`<span class="tag trigger-tag">${t}</span>`).join("")}
  </div>`:""}
  ${uniqueEffective.length?`
  <div style="margin-top:8px;">
    <div class="label" style="margin-bottom:5px;">Treatments with documented effectiveness</div>
    ${uniqueEffective.map(t=>`<span class="tag effective-tag">${t}</span>`).join("")}
  </div>`:""}
  ${uniqueIneffective.length?`
  <div style="margin-top:8px;">
    <div class="label" style="margin-bottom:5px;">Treatments with no documented effectiveness</div>
    ${uniqueIneffective.map(t=>`<span class="tag ineffective-tag">${t}</span>`).join("")}
  </div>`:""}
</div>

<div class="section">
  <div class="section-header">◈ &nbsp;Patient-Provided Information</div>
  <div class="fill-section">
    <div class="fill-row"><span class="fill-label">Preferred pain medication(s)</span><span class="fill-value">${form.preferredMeds||""}</span></div>
    <div class="fill-row"><span class="fill-label">Step-up medication(s)</span><span class="fill-value">${form.stepUpMeds||""}</span></div>
    <div class="fill-row"><span class="fill-label">Known allergies</span><span class="fill-value">${form.allergies||"None reported"}</span></div>
    <div class="fill-row"><span class="fill-label">Hematologist / SCD specialist</span><span class="fill-value">${form.hematologistName||""}</span></div>
    <div class="fill-row"><span class="fill-label">Specialist phone</span><span class="fill-value">${form.hematologistPhone||""}</span></div>
    <div class="fill-row"><span class="fill-label">Emergency contact</span><span class="fill-value">${form.emergencyContact||""}</span></div>
    <div class="fill-row"><span class="fill-label">Emergency contact phone</span><span class="fill-value">${form.emergencyPhone||""}</span></div>
    ${form.additionalNotes?`<div class="fill-row"><span class="fill-label">Additional notes</span><span class="fill-value">${form.additionalNotes}</span></div>`:""}
  </div>
</div>

<div class="section">
  <div class="section-header">◈ &nbsp;Protocol to Be Established (Clinician Completes)</div>
  <div class="fill-section">
    <div class="fill-row"><span class="fill-label">First-line pain medication</span><span class="fill-value">&nbsp;</span></div>
    <div class="fill-row"><span class="fill-label">Dose and route</span><span class="fill-value">&nbsp;</span></div>
    <div class="fill-row"><span class="fill-label">Reassessment interval</span><span class="fill-value">&nbsp;</span></div>
    <div class="fill-row"><span class="fill-label">Step-up if inadequate relief</span><span class="fill-value">&nbsp;</span></div>
    <div class="fill-row"><span class="fill-label">Admission threshold</span><span class="fill-value">&nbsp;</span></div>
    <div class="fill-row"><span class="fill-label">IV fluids</span><span class="fill-value">&nbsp;</span></div>
    <div class="fill-row"><span class="fill-label">Other standing orders</span><span class="fill-value">&nbsp;</span></div>
  </div>
</div>

<div class="sign-box">
  <div style="font-size:11px;color:#374151;font-weight:600;margin-bottom:4px;">Clinician Authorization</div>
  <div style="font-size:11px;color:#6b7280;line-height:1.7;">By signing below, the clinician confirms they have reviewed this protocol request, made appropriate clinical adaptations, and established this as the patient's standing SCD pain management protocol.</div>
  <div class="sign-row">
    <div class="sign-field">
      <div class="sign-line"></div>
      <div class="sign-label">Clinician Signature</div>
    </div>
    <div class="sign-field">
      <div class="sign-line"></div>
      <div class="sign-label">Printed Name & Title</div>
    </div>
    <div class="sign-field">
      <div class="sign-line"></div>
      <div class="sign-label">Date</div>
    </div>
    <div class="sign-field">
      <div class="sign-line"></div>
      <div class="sign-label">NPI / License #</div>
    </div>
  </div>
</div>

<div class="footer">
  <div style="font-size:10px;color:#aaa;line-height:1.8;">
    Warrior Intelligence Project &nbsp;·&nbsp; Sickle Cell Warriors of Buffalo<br/>
    info@kindredcompassholdings.com &nbsp;·&nbsp; 716-818-2338<br/>
    warrior-intelligence-dashboard.vercel.app
  </div>
  <div style="text-align:right;">
    <div class="tagline">Our Pain. Our Data. Our Power.</div>
    <div class="copyright">© ${new Date().getFullYear()} Jason Robert Moore. All Rights Reserved.<br/>Human Intelligence Infrastructure (Hii) Framework.</div>
  </div>
</div>

</body>
</html>`;

    const win=window.open("","_blank");
    if(win){
      win.document.open();
      win.document.write(html);
      win.document.close();
      setTimeout(()=>{ try{win.print();}catch(e){} },900);
    } else {
      const blob=new Blob([html],{type:"text/html"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;
      a.target="_blank";
      a.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
  }

  const inputStyle={width:"100%",background:C.surf,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:13,outline:"none",fontFamily:"'IBM Plex Sans',sans-serif"};
  const labelStyle={fontSize:11,color:C.muted,letterSpacing:.5,marginBottom:5,display:"block"};

  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.85)",zIndex:100,overflowY:"auto",padding:"24px 16px"}}>
      <div style={{maxWidth:600,margin:"0 auto",background:C.surf,borderRadius:16,border:`1px solid ${C.border}`,padding:28}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:10,letterSpacing:2.5,color:C.red,textTransform:"uppercase",marginBottom:3}}>Protocol Builder</div>
            <div style={{fontFamily:"Syne",fontWeight:800,fontSize:18}}>SCD Pain Protocol Request</div>
            <div style={{fontSize:12,color:C.muted,marginTop:3}}>This document goes to your doctor to establish your ER protocol.</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:20,cursor:"pointer",padding:4}}>✕</button>
        </div>

        <div style={{background:`${C.teal}0a`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:12,color:"rgba(255,255,255,0.7)",lineHeight:1.7}}>
          <span style={{color:C.teal,fontWeight:600}}>Pre-filled from your tracker data:</span> average pain {avgPain}/10, top triggers ({topTriggers.join(", ")||"—"}){uniqueEffective.length?`, effective treatments (${uniqueEffective.slice(0,2).join(", ")})`:""}.
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <label style={labelStyle}>Preferred pain medication(s) *</label>
            <input style={inputStyle} placeholder="e.g. IV Dilaudid 1mg, oral oxycodone" value={form.preferredMeds} onChange={e=>update("preferredMeds",e.target.value)}/>
          </div>
          <div>
            <label style={labelStyle}>Step-up medication(s) if first-line fails</label>
            <input style={inputStyle} placeholder="e.g. Morphine PCA, IV ketamine" value={form.stepUpMeds} onChange={e=>update("stepUpMeds",e.target.value)}/>
          </div>
          <div>
            <label style={labelStyle}>Known allergies or medications to avoid</label>
            <input style={inputStyle} placeholder="e.g. NSAIDS, codeine, penicillin" value={form.allergies} onChange={e=>update("allergies",e.target.value)}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <label style={labelStyle}>Hematologist / SCD specialist name</label>
              <input style={inputStyle} placeholder="Dr. Name" value={form.hematologistName} onChange={e=>update("hematologistName",e.target.value)}/>
            </div>
            <div>
              <label style={labelStyle}>Specialist phone number</label>
              <input style={inputStyle} placeholder="(000) 000-0000" value={form.hematologistPhone} onChange={e=>update("hematologistPhone",e.target.value)}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <label style={labelStyle}>Emergency contact name</label>
              <input style={inputStyle} placeholder="Full name" value={form.emergencyContact} onChange={e=>update("emergencyContact",e.target.value)}/>
            </div>
            <div>
              <label style={labelStyle}>Emergency contact phone</label>
              <input style={inputStyle} placeholder="(000) 000-0000" value={form.emergencyPhone} onChange={e=>update("emergencyPhone",e.target.value)}/>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Additional notes for your doctor (optional)</label>
            <textarea style={{...inputStyle,minHeight:72,resize:"vertical"}} placeholder="Anything else your doctor should know..." value={form.additionalNotes} onChange={e=>update("additionalNotes",e.target.value)}/>
          </div>
        </div>

        <div style={{display:"flex",gap:10,marginTop:22}}>
          <button onClick={onClose} style={{flex:1,background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"11px 0",color:C.muted,fontSize:13,cursor:"pointer"}}>Cancel</button>
          <button onClick={generateProtocol} style={{flex:2,background:C.red,border:"none",borderRadius:8,padding:"11px 0",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>Generate Protocol Request →</button>
        </div>

        <div style={{marginTop:14,fontSize:11,color:C.muted,textAlign:"center",lineHeight:1.6}}>
          Nothing you enter here is stored or transmitted. This generates a PDF for you to print or save.
        </div>
      </div>
    </div>
  );
}

// ── SHOW ED MODE ─────────────────────────────────────────────────────────────
function EDMode({entries, onClose}){
  const sorted=[...entries].sort((a,b)=>new Date(a.submitted)-new Date(b.submitted));
  const latest=sorted[sorted.length-1];
  const triggerCounts=countT(entries);
  const topTriggers=triggerCounts.slice(0,3).map(([t])=>t);
  const violations=entries.filter(e=>e.erVisit==="Yes"&&(e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team"))));
  const avgP=entries.map(e=>e.pain).filter(p=>p>0);
  const avg=avgP.length?(avgP.reduce((a,b)=>a+b,0)/avgP.length).toFixed(1):"—";
  const today=new Date().toISOString().slice(0,10);
  const homeFailed=latest.working==="Not at all"||latest.working==="A little";
  const hasMenstrual=entries.some(e=>e.triggered&&e.triggered.some(t=>t.includes("Menstrual")));

  // Stability
  const gaps=[];
  for(let i=1;i<sorted.length;i++) gaps.push(days(sorted[i-1].submitted,sorted[i].submitted));
  const daysSinceLast=days(sorted[sorted.length-1].submitted,today);
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
  if(!latest.ongoing&&daysSinceLast>30)score+=20;
  else if(!latest.ongoing&&daysSinceLast>14)score+=10;
  score=Math.max(10,Math.min(95,score));
  const statusLabel=score>=65?"STABLE":score>=40?"WATCHFUL":"HIGH LOAD";
  const statusColor=score>=65?C.green:score>=40?C.amber:C.red;

  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#fff",zIndex:200,overflowY:"auto",padding:"32px 28px",color:"#111",fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif"}}>

      {/* Close button */}
      <button onClick={onClose} style={{position:"fixed",top:16,right:16,background:"#f3f4f6",border:"none",borderRadius:8,padding:"8px 16px",fontSize:13,cursor:"pointer",color:"#374151",fontWeight:500,zIndex:201}}>✕ Exit ED Mode</button>

      {/* Header */}
      <div style={{borderBottom:"3px solid #990000",paddingBottom:16,marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"#888",marginBottom:4}}>Human Intelligence Infrastructure · Warrior Intelligence Project</div>
          <div style={{fontSize:28,fontWeight:800,color:"#0f0f0f",letterSpacing:-0.5,lineHeight:1.1}}>Hii Clinical Intelligence Brief</div>
          <div style={{fontSize:14,color:"#555",marginTop:6}}>Warrior ID: <strong>{entries[0].warriorId}</strong> &nbsp;·&nbsp; {today} &nbsp;·&nbsp; {entries.length} report{entries.length!==1?"s":""} on record</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
          <div style={{padding:"12px 24px",borderRadius:8,fontWeight:800,fontSize:18,letterSpacing:2,textTransform:"uppercase",background:`${statusColor}15`,color:statusColor,border:`2px solid ${statusColor}50`}}>{statusLabel}</div>
          <div style={{fontSize:10,color:"#aaa",textAlign:"right"}}>warrior-intelligence-dashboard.vercel.app</div>
        </div>
      </div>

      {/* Clinical Request — FIRST AND PROMINENT */}
      <div style={{background:"#f0f9ff",border:"2px solid #0ea5e9",borderRadius:12,padding:"20px 24px",marginBottom:28}}>
        <div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"#0369a1",fontWeight:700,marginBottom:10}}>◈ Clinical Request</div>
        <div style={{fontSize:18,fontWeight:700,color:"#0c4a6e",lineHeight:1.6,marginBottom:12}}>
          Please initiate established Sickle Cell pain protocol immediately.
        </div>
        <div style={{fontSize:15,color:"#0c4a6e",lineHeight:1.7}}>
          Home management has been attempted and {homeFailed?"has reached its limit.":"is supplementary to this visit."}<br/>
          Community data from 78 Warriors shows patients who are admitted report outcomes <strong>2.5× better</strong> than those treated and released.
        </div>
        {violations.length>0&&(
          <div style={{marginTop:12,padding:"10px 14px",background:"#fff1f2",border:"1px solid #fecdd3",borderRadius:8,fontSize:14,color:"#7f1d1d",fontWeight:600}}>
            ⚠ {violations.length} documented protocol violation{violations.length>1?"s":""} on record at prior visits.
          </div>
        )}
      </div>

      {/* Three columns */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:28}}>

        {/* Compass */}
        <div style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:18}}>
          <div style={{fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:"#990000",fontWeight:700,marginBottom:12,paddingBottom:6,borderBottom:"1px solid #fce8e8"}}>◈ Compass</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div><div style={{fontSize:11,color:"#888"}}>Crisis reports on record</div><div style={{fontSize:20,fontWeight:800,color:"#111"}}>{entries.length}</div></div>
            <div><div style={{fontSize:11,color:"#888"}}>Average pain level</div><div style={{fontSize:20,fontWeight:800,color:"#dc2626"}}>{avg}/10</div></div>
            <div><div style={{fontSize:11,color:"#888"}}>Pain (last report)</div><div style={{fontSize:20,fontWeight:800,color:"#dc2626"}}>{latest.pain}/10</div></div>
            <div><div style={{fontSize:11,color:"#888"}}>Stability window</div><div style={{fontSize:16,fontWeight:700,color:"#111"}}>{daysSinceLast} days</div></div>
            <div><div style={{fontSize:11,color:"#888"}}>Current status</div><div style={{fontSize:13,fontWeight:600,color:latest.ongoing?"#dc2626":"#16a34a"}}>{latest.ongoing?"Active crisis":"Resolved"}</div></div>
            {latest.hydrationOz&&<div><div style={{fontSize:11,color:"#888"}}>Pre-crisis hydration</div><div style={{fontSize:14,fontWeight:700,color:latest.hydrationOz<40?"#dc2626":latest.hydrationOz>=64?"#16a34a":"#d97706"}}>{latest.hydrationOz}oz</div></div>}
          </div>
        </div>

        {/* Loop */}
        <div style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:18}}>
          <div style={{fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:"#990000",fontWeight:700,marginBottom:12,paddingBottom:6,borderBottom:"1px solid #fce8e8"}}>◈ Loop — Triggers</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {triggerCounts.slice(0,3).map(([t,count],i)=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"3px 8px",borderRadius:4,fontWeight:700,background:i===0?"#fef3c7":i===1?"#f1f5f9":"#f0fdf4",color:i===0?"#92400e":i===1?"#475569":"#166534",border:`1px solid ${i===0?"#fde68a":i===1?"#cbd5e1":"#bbf7d0"}`,flexShrink:0}}>{i===0?"Primary":i===1?"Secondary":"Emerging"}</span>
                <span style={{fontSize:14,fontWeight:700,color:"#111"}}>{t}</span>
                <span style={{fontSize:11,color:"#888",marginLeft:"auto"}}>{count}/{entries.length}</span>
              </div>
            ))}
            {hasMenstrual&&<div style={{marginTop:6,padding:"8px 10px",background:"#fdf4ff",border:"1px solid #e9d5ff",borderRadius:6,fontSize:12,color:"#6b21a8",fontWeight:600}}>⚠ Menstrual cycle — documented trigger</div>}
          </div>
          {latest.treatment.length>0&&(
            <div style={{marginTop:14,paddingTop:10,borderTop:"1px solid #f3f4f6"}}>
              <div style={{fontSize:11,color:"#888",marginBottom:4}}>Home management attempted</div>
              <div style={{fontSize:13,color:"#111",lineHeight:1.6}}>{latest.treatment.filter(t=>!t.includes("Nothing")).join(", ")||"—"}</div>
              {latest.working&&<div style={{fontSize:12,color:homeFailed?"#dc2626":"#16a34a",fontWeight:600,marginTop:4}}>Response: {latest.working}</div>}
            </div>
          )}
        </div>

        {/* Safeguard */}
        <div style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:18}}>
          <div style={{fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:"#990000",fontWeight:700,marginBottom:12,paddingBottom:6,borderBottom:"1px solid #fce8e8"}}>◈ Safeguard</div>
          {entries.filter(e=>e.erVisit==="Yes").length>0?(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {entries.filter(e=>e.erVisit==="Yes").map((e,i)=>{
                const viol=e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team"));
                return(
                  <div key={i} style={{padding:"8px 10px",borderRadius:6,background:viol?"#fff1f2":"#f0fdf4",border:`1px solid ${viol?"#fecdd3":"#bbf7d0"}`}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#111"}}>{e.hospital||"ER Visit"}</div>
                    <div style={{fontSize:11,color:"#555"}}>{e.submitted}</div>
                    <div style={{fontSize:12,fontWeight:600,color:viol?"#dc2626":"#16a34a",marginTop:2}}>{viol?"✗ Protocol NOT followed":"✓ Protocol followed"}</div>
                  </div>
                );
              })}
            </div>
          ):(
            <div style={{fontSize:13,color:"#888"}}>No ER visits on record.</div>
          )}
          <div style={{marginTop:14,paddingTop:10,borderTop:"1px solid #f3f4f6",fontSize:11,color:"#555",lineHeight:1.6}}>
            Data verified by Sickle Cell Warriors of Buffalo · Community evidence base
          </div>
        </div>
      </div>

      {/* Cost context */}
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"14px 18px",marginBottom:24,fontSize:13,color:"#78350f",lineHeight:1.7}}>
        <strong>Systemic Risk & Cost Context:</strong> Shah et al. (2020) estimates mean annual SCD-related costs at <strong>~$59,000 per patient</strong> — largely driven by ineffective treat-and-release cycles. Protocol adherence at this visit directly affects that trajectory.
      </div>

      {/* Footer */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",paddingTop:14,borderTop:"1px solid #e5e7eb"}}>
        <div style={{fontSize:11,color:"#aaa",lineHeight:1.8}}>
          Warrior Intelligence Project · Sickle Cell Warriors of Buffalo<br/>
          info@kindredcompassholdings.com · 716-818-2338<br/>
          warrior-intelligence-dashboard.vercel.app
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:12,color:"#C1A004",fontWeight:700,letterSpacing:.5}}>Our Pain. Our Data. Our Power.</div>
          <div style={{fontSize:9,color:"#bbb",marginTop:2}}>© {new Date().getFullYear()} Jason Robert Moore. All Rights Reserved. Human Intelligence Infrastructure (Hii) Framework.</div>
        </div>
      </div>

    </div>
  );
}

// ── WARRIOR PROFILE ───────────────────────────────────────────────────────────
function WarriorProfile({entries,onReset}){
  const [localEntries,setLocalEntries]=useState(entries);
  const [showProtocolBuilder,setShowProtocolBuilder]=useState(false);
  const [showEDMode,setShowEDMode]=useState(false);
  const sorted=[...localEntries].sort((a,b)=>new Date(a.submitted)-new Date(b.submitted));
  const topT=countT(localEntries).slice(0,3).map(([t])=>t);
  const erCount=localEntries.filter(e=>e.erVisit==="Yes").length;
  const violCount=localEntries.filter(e=>e.erVisit==="Yes"&&(e.protocolFollowed==="No"||(e.whyNot&&e.whyNot.toLowerCase().includes("medical team")))).length;
  const hasMenstrual=localEntries.some(e=>e.triggered.some(t=>t.includes("Menstrual")));
  const spanDays=localEntries.length>1?days(sorted[0].submitted,sorted[sorted.length-1].submitted):0;

  async function handleResolve(submissionId, warriorId){
    try{
      const result = await resolveCrisis(submissionId, warriorId);
      if(result.success || result.alreadyResolved){
        // Optimistic update — mark ongoing false locally
        setLocalEntries(prev=>prev.map(e=>
          (e.submission_id||e.id)===submissionId ? {...e, ongoing:false} : e
        ));
      }
    } catch(err){
      console.error("Resolve failed:", err);
    }
  }
  return(
    <div className="fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <button onClick={onReset} style={{background:"none",border:"none",color:C.muted,fontSize:13,display:"flex",alignItems:"center",gap:6,padding:0}}>← Search again</button>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setShowEDMode(true)} style={{background:C.red,border:"none",borderRadius:8,padding:"7px 16px",color:"#fff",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>🏥 Show ED</button>
          <button onClick={()=>setShowProtocolBuilder(true)} style={{background:"none",border:`1px solid ${C.teal}50`,borderRadius:8,padding:"7px 16px",color:C.teal,fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:6}}>⚕ Build Protocol</button>
          <button onClick={()=>generateBrief(localEntries)} style={{background:"none",border:`1px solid ${C.amber}50`,borderRadius:8,padding:"7px 16px",color:C.amber,fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:6}}>⬇ Export Clinical Brief</button>
        </div>
      </div>
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:14,padding:24,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14,marginBottom:20}}>
          <div>
            <div style={{fontFamily:"Syne",fontWeight:800,fontSize:22,marginBottom:2}}>{entries[0].warriorId}</div>
            <div style={{fontSize:13,color:C.muted}}>{entries[0].community} · Tracking for {entries[0].trackingFor}{spanDays>0&&` · ${spanDays} days of data`}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:10,flex:1,maxWidth:420}}>
            <Pill label="Crises Logged" value={localEntries.length} accent={C.blue}/>
            <Pill label="Avg Pain" value={avgPain(localEntries)} accent={C.red}/>
            <Pill label="ER Visits" value={erCount} accent={C.amber}/>
            {violCount>0&&<Pill label="Violations" value={violCount} accent={C.red}/>}
          </div>
        </div>
        <StabilityScore entries={localEntries}/>
        <PatternMirror entries={localEntries}/>
      </div>
      <div style={{fontSize:10,letterSpacing:2.5,color:C.muted,textTransform:"uppercase",marginBottom:14}}>Crisis Timeline — oldest first</div>
      {sorted.map((e,i)=><Entry key={e.id} e={e} isLast={i===sorted.length-1} onResolve={handleResolve}/>)}
      {showProtocolBuilder&&<ProtocolBuilder entries={localEntries} onClose={()=>setShowProtocolBuilder(false)}/> }
      {showEDMode&&<EDMode entries={localEntries} onClose={()=>setShowEDMode(false)}/>}
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
  // Wait times are mixed numeric/string — count recorded vs not
  const recordedWaits=erVisits.filter(d=>d.waitHours&&d.waitHours!==0&&d.waitHours!=="0");
  const numericWaits=recordedWaits.filter(d=>typeof d.waitHours==="number"&&d.waitHours>0);
  const avgWait=numericWaits.length?(numericWaits.reduce((s,d)=>s+d.waitHours,0)/numericWaits.length).toFixed(1):null;
  return(
    <div className="fade">
      <div style={{background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:14,padding:20,marginBottom:20}}>
        <div style={{fontFamily:"Syne",fontWeight:700,color:C.red,marginBottom:6}}>Community-Owned Evidence</div>
        <div style={{fontSize:13,lineHeight:1.75,color:"rgba(255,255,255,0.7)"}}>These records document systemic patterns, not individual accusations. Protocol deviations represent design failures in how healthcare systems treat SCD patients. This data belongs to Warriors for advocacy, hospital quality improvement conversations, and policy reform.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        <Pill label="ER Visits" value={erVisits.length} accent={C.blue}/>
        <Pill label="Violation Rate" value={`${Math.round(violations.length/erVisits.length*100)}%`} accent={C.red} sub={`${violations.length} incidents`}/>
        <Pill label="Avg Wait" value={avgWait?`${avgWait}h`:`${recordedWaits.length} logged`} accent={C.amber} sub={avgWait?`${recordedWaits.length} recorded`:null}/>
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
            <div style={{fontSize:13,marginBottom:4}}><span style={{color:C.red}}>🏥 {v.hospital||"Unknown"} </span><span style={{color:C.muted}}>· {fmtWait(v.waitHours)||"wait not recorded"} · Pain {v.pain}/10</span></div>
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

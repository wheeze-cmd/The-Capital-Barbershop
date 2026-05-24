const supabaseUrl = "https://ejnbylyuzzyrmcndflxk.supabase.co";
const supabaseKey = "sb_publishable_1yW9v4QxoUpKiZV6-HTFmg_hacS2CzP";

const client = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ⏰ GET SELECTED DATETIME
    const selectedTime = document.getElementById("preferred_time").value;

    // ⏰ EXTRACT HOUR
    const hour = new Date(selectedTime).getHours();

    // 🚫 ALLOW ONLY 12PM–7PM
    if (hour < 12 || hour > 18) {
        alert("Please select a time between 12PM and 6PM only");
        return;
    }

    // 📦 FORM DATA
    const data = {
        name: document.getElementById("name").value,
        contact: document.getElementById("contact").value,
        service: document.getElementById("service").value,
        preferred_time: selectedTime,
        note: document.getElementById("note").value
    };

    // 🔍 CHECK IF TIMESLOT EXISTS
    const { data: existing, error: checkError } = await client
        .from("appointment")
        .select("*")
        .eq("preferred_time", selectedTime);

    if (checkError) {
        console.log(checkError);
        alert("Error checking availability");
        return;
    }

    // ❌ SLOT ALREADY TAKEN
    if (existing.length > 0) {
        alert("Booking failed! Timeslot occupied 😢");
        return;
    }

    // ✅ INSERT BOOKING
    const { error } = await client
        .from("appointment")
        .insert([data]);

    if (error) {
        console.log("Supabase error:", error);
        alert(error.message);
    } else {
        alert("Booked successfully 🎉");
        form.reset();
    }
});
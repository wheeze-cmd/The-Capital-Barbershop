const supabaseUrl = "https://ejnbylyuzzyrmcndflxk.supabase.co";
const supabaseKey = "sb_publishable_1yW9v4QxoUpKiZV6-HTFmg_hacS2CzP";

const client = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 📅 GET DATE + TIME
    const selectedDate = document.getElementById("appointment_date").value;
    const selectedTime = document.getElementById("appointment_time").value;

    // 🚫 CHECK IF EMPTY
    if (!selectedDate || !selectedTime) {
        alert("Please select a valid date and time");
        return;
    }

    // 🔥 COMBINE DATE + TIME
    const normalizedTime = `${selectedDate}T${selectedTime}`;

    // 📦 FORM DATA
    const data = {
        name: document.getElementById("name").value,
        contact: document.getElementById("contact").value,
        service: document.getElementById("service").value,
        preferred_time: normalizedTime,
        note: document.getElementById("note").value
    };

    // 🔍 CHECK IF TIMESLOT EXISTS
    const { data: existing, error: checkError } = await client
        .from("appointment")
        .select("*")
        .eq("preferred_time", normalizedTime.slice(0, 16));

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
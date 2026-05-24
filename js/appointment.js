const supabaseUrl = "https://ejnbylyuzzyrmcndflxk.supabase.co";
const supabaseKey = "sb_publishable_1yW9v4QxoUpKiZV6-HTFmg_hacS2CzP";

const client = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        contact: document.getElementById("contact").value,
        service: document.getElementById("service").value,
        preferred_time: document.getElementById("preferred_time").value,
        note: document.getElementById("note").value
    };

    const { error } = await client
        .from("appointments")
        .insert([data]);

    if (error) {
        console.log("Supabase error:", error);
        alert(error.message);
    } else {
        alert("Booked successfully 🎉");
        form.reset();
    }
});
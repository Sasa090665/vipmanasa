document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }
});

function handleBooking(e) {
    e.preventDefault();
    
    const name = document.getElementById('student_name').value;
    const phone = document.getElementById('phone_num').value;
    const trip = document.getElementById('trip_select').options[document.getElementById('trip_select').selectedIndex].text;
    const seats = document.getElementById('seat_count').value;
    const notes = document.getElementById('notes_text').value;

    // تكوين الرسالة
    const message = `طلب حجز جديد ✨\n\n👤 الاسم: ${name}\n📱 هاتف الطالب: ${phone}\n🎯 الرحلة: ${trip}\n👥 عدد الأفراد: ${seats}\n📝 ملاحظات: ${notes || "لا يوجد"}\n\nيرجى تأكيد الحجز من فريق VIP.`;

    // فتح واتساب على الرقم المطلوب مع الرسالة
    const whatsappURL = `https://wa.me/201094978153?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    e.target.reset();
}
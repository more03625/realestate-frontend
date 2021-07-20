export const openInGmail = (to, cc = null, bcc = null) => {

    var subject = "This is subject";
    var body = "This is body";
    var mailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    return mailLink;
}
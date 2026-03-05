// ═══════════════════════════════════════
// RESERVATION MODAL
// ═══════════════════════════════════════
function openResModal(){
  const ov = document.getElementById('resOverlay');
  ov.classList.add('open');
  document.body.style.overflow='hidden';
  const today=new Date().toISOString().split('T')[0];
  document.getElementById('m-date').min=today;
  document.getElementById('m-date').value=today;
  document.getElementById('modForm').style.display='block';
  document.getElementById('modSuccess').style.display='none';
  document.getElementById('modError').style.display='none';
}
function closeResModal(){
  const onSuccess=document.getElementById('modSuccess').style.display!=='none';
  document.getElementById('resOverlay').classList.remove('open');
  document.body.style.overflow='';
  if(onSuccess) window.scrollTo({top:0,behavior:'smooth'});
}
document.getElementById('resOverlay').addEventListener('click',function(e){if(e.target===this)closeResModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeResModal();});

function buildWAMsg(name,phone,date,time,guests,occasion,note){
  const d=new Date(date+'T00:00:00');
  const fd=d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  return [
    '🍛 *New Table Reservation – The Bangalore Cafe*','',
    `👤 *Name:* ${name}`,`📱 *Mobile:* ${phone}`,
    `📅 *Date:* ${fd}`,`⏰ *Time:* ${time}`,`👥 *Guests:* ${guests}`,
    occasion?`🎉 *Occasion:* ${occasion}`:null,
    note?`📝 *Requests:* ${note}`:null,'',
    '_Sent via The Bangalore Cafe website_'
  ].filter(Boolean).join('\n');
}

function submitModal(){
  const name=document.getElementById('m-name').value.trim();
  const phone=document.getElementById('m-phone').value.trim();
  const date=document.getElementById('m-date').value;
  const time=document.getElementById('m-time').value;
  const guests=document.getElementById('m-guests').value;
  const occ=document.getElementById('m-occ').value;
  const note=document.getElementById('m-note').value.trim();
  const fields=['m-name','m-phone','m-date','m-time','m-guests'];
  fields.forEach(id=>document.getElementById(id).classList.remove('err'));
  let err=false;
  if(!name){document.getElementById('m-name').classList.add('err');err=true;}
  if(!phone){document.getElementById('m-phone').classList.add('err');err=true;}
  if(!date){document.getElementById('m-date').classList.add('err');err=true;}
  if(!time){document.getElementById('m-time').classList.add('err');err=true;}
  if(!guests){document.getElementById('m-guests').classList.add('err');err=true;}
  if(err){document.getElementById('modError').style.display='block';return;}
  const d=new Date(date+'T00:00:00');
  const fd=d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  document.getElementById('modSummary').innerHTML=`<strong>Name:</strong> ${name}<br/><strong>Date:</strong> ${fd}<br/><strong>Time:</strong> ${time}<br/><strong>Guests:</strong> ${guests}${occ?`<br/><strong>Occasion:</strong> ${occ}`:''}${note?`<br/><strong>Requests:</strong> ${note}`:''}`;
  document.getElementById('modForm').style.display='none';
  document.getElementById('modSuccess').style.display='block';
  window.open(`https://wa.me/919535964043?text=${encodeURIComponent(buildWAMsg(name,phone,date,time,guests,occ,note))}`,'_blank');
}

// Page reservation form
function submitRes(){
  const name=document.getElementById('p-name').value.trim();
  const phone=document.getElementById('p-phone').value.trim();
  const date=document.getElementById('p-date').value;
  const time=document.getElementById('p-time').value;
  const guests=document.getElementById('p-guests').value;
  const occ=document.getElementById('p-occ').value;
  const note=document.getElementById('p-note').value.trim();
  const fields=['p-name','p-phone','p-date','p-time','p-guests'];
  fields.forEach(id=>document.getElementById(id).classList.remove('err'));
  let err=false;
  if(!name){document.getElementById('p-name').classList.add('err');err=true;}
  if(!phone){document.getElementById('p-phone').classList.add('err');err=true;}
  if(!date){document.getElementById('p-date').classList.add('err');err=true;}
  if(!time){document.getElementById('p-time').classList.add('err');err=true;}
  if(!guests){document.getElementById('p-guests').classList.add('err');err=true;}
  if(err){document.getElementById('resError').style.display='block';return;}
  const d=new Date(date+'T00:00:00');
  const fd=d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  document.getElementById('resSummary').innerHTML=`<strong>Name:</strong> ${name}<br/><strong>Date:</strong> ${fd}<br/><strong>Time:</strong> ${time}<br/><strong>Guests:</strong> ${guests}${occ?`<br/><strong>Occasion:</strong> ${occ}`:''}${note?`<br/><strong>Requests:</strong> ${note}`:''}`;
  document.getElementById('resFormCard').style.display='none';
  document.getElementById('resSuccess').style.display='block';
  window.open(`https://wa.me/919535964043?text=${encodeURIComponent(buildWAMsg(name,phone,date,time,guests,occ,note))}`,'_blank');
}

function resetRes(){
  document.getElementById('resFormCard').style.display='block';
  document.getElementById('resSuccess').style.display='none';
  ['p-name','p-phone','p-time','p-guests','p-occ','p-note'].forEach(id=>document.getElementById(id).value='');
  const today=new Date().toISOString().split('T')[0];
  document.getElementById('p-date').value=today;
}

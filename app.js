const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const Text_Entry = document.getElementById("Text_Entry");
const Send_Button = document.getElementById("Send_Button");

const connect = document.getElementById("connect");
const Recived_Data = document.getElementById("Recived_Data");

const decoder=new TextDecoder();
const encoder=new TextEncoder();


let device;
connectButton.onclick = async () => {
  device = await navigator.usb.requestDevice({
    filters: [{}]
  });

  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(0);

  connected.style.display = "block";
  connectButton.style.display = "none";
  disconnectButton.style.display = "initial";
  listen();
};

const listen = async () => {
  const result = await device.transferIn(1, 64);

  const message = decoder.decode(result.data);
  console.log('Received: ' +message);

  Recived_Data.innerText = "\n"+ message;
  
  listen();
};

Send_Button.onclick = async () => {
  const data=encoder.encode(Text_Entry.value);
  console.log(data);
  await device.transferOut(1, data);
};

disconnectButton.onclick = async () => {
  await device.close();

  connected.style.display = "none";
  connectButton.style.display = "initial";
  disconnectButton.style.display = "none";
};
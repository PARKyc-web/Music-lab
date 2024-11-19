async function saveToMP3(){
    toneSound.connect(recorder);

    await Tone.start();

    recorder.start();
    for (let i = 0; i < playNotes.length; i++) { // length 31                

        displayCurCell(i);
        toneSound.triggerAttackRelease(playNotes[i], "8n", Tone.now());
        
        await delay(300);
    }

    // 녹음 완료 후 MP3로 저장
    const recordedBuffer = await recorder.stop();
    
    // MP3 인코딩을 위해 lamejs 사용
    const mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128); // 1채널, 44.1kHz, 128kbps
    const mp3Data = [];

    // 녹음된 샘플을 MP3로 인코딩
    const samples = recordedBuffer.get().getChannelData(0); // 녹음된 버퍼에서 첫 번째 채널의 데이터 가져오기
    const mp3Buffer = mp3encoder.encodeBuffer(samples);
    mp3Data.push(mp3Buffer);

    // 마지막 부분을 처리
    const finalBuffer = mp3encoder.flush();
    if (finalBuffer.length > 0) {
        mp3Data.push(finalBuffer);
    }

    // Blob 생성 후 다운로드 링크 제공
    const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' });
    const url = URL.createObjectURL(mp3Blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'synth_sound.mp3';
    a.click();
}
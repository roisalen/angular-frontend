speaker = new Speaker("Torkil", 1);
speakerRepository = new SpeakerRepository();
speakerRepository.add(speaker);
console.log(speakerRepository.getSpeakers());
console.log(speakerRepository.size())

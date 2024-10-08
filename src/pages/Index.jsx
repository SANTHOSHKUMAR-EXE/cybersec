import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Button } from '@/components/ui/button';
import { VolumeIcon, VolumeXIcon, LockIcon, UnlockIcon } from 'lucide-react';

const Index = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();

  const handleSpeak = (text) => {
    if (isSpeaking) {
      cancel();
      setIsSpeaking(false);
    } else {
      speak({ text });
      setIsSpeaking(true);
    }
  };

  const startTraining = () => {
    setIsTrainingStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <header className="py-8 px-4 bg-black bg-opacity-50">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
            IBM Cybersecurity Awareness Training Program
          </h1>
          <img src="https://i.ibb.co/sQxt9Ms/ibm-ice-768x266.webp" alt="IBM Logo" className="mx-auto h-16 my-6" />
          <p className="text-xl mb-6 animate-fade-in-up">
            Empowering employees with knowledge to protect our digital assets
          </p>
          <Button className="animate-pulse-slow" onClick={startTraining}>
            {isTrainingStarted ? (
              <>
                <UnlockIcon className="mr-2 h-4 w-4" /> Training Unlocked
              </>
            ) : (
              <>
                <LockIcon className="mr-2 h-4 w-4" /> Start Your Training
              </>
            )}
          </Button>
        </div>
      </header>

      {isTrainingStarted && (
        <>
          <nav className="bg-black bg-opacity-70 p-4 sticky top-0 z-10">
            <div className="container mx-auto flex flex-wrap justify-center space-x-4">
              {['intro', 'need', 'common-crimes', 'scams', 'awareness', 'attacks', 'resources'].map((item) => (
                <Link
                  key={item}
                  to={item}
                  smooth={true}
                  duration={500}
                  className="text-white hover:text-blue-300 cursor-pointer transition-colors duration-300"
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              ))}
            </div>
          </nav>

          <div className="container mx-auto px-4 py-8">
            {['intro', 'need', 'common-crimes', 'scams', 'awareness', 'attacks', 'resources'].map((sectionId) => (
              <Section key={sectionId} id={sectionId} handleSpeak={handleSpeak} isSpeaking={isSpeaking} />
            ))}
          </div>

          <footer className="bg-black bg-opacity-70 text-white py-6 text-center">
            <p>&copy; 2024 IBM Cybersecurity Awareness Training Program</p>
            <p className="mt-2">Protecting our digital future, together.</p>
          </footer>
        </>
      )}
    </div>
  );
};

const Section = ({ id, handleSpeak, isSpeaking }) => {
  const content = getSectionContent(id);
  const speakText = `${content.title}. ${content.bodyText}`;

  return (
    <section id={id} className="mb-12 bg-white bg-opacity-10 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-300">{content.title}</h2>
        <Button
          onClick={() => handleSpeak(speakText)}
          variant="outline"
          size="icon"
          className="ml-2 bg-blue-500 hover:bg-blue-600"
        >
          {isSpeaking ? <VolumeXIcon className="h-5 w-5" /> : <VolumeIcon className="h-5 w-5" />}
        </Button>
      </div>
      {content.body}
    </section>
  );
};

const getSectionContent = (id) => {
  const contents = {
    intro: {
      title: "What is Cybersecurity?",
      body: <p><strong>Cybersecurity</strong> refers to the practice of protecting systems, networks, and data from digital attacks. In today's connected world, businesses and individuals are increasingly vulnerable to hackers, who aim to steal sensitive information, disrupt operations, or damage reputations.</p>,
      bodyText: "Cybersecurity refers to the practice of protecting systems, networks, and data from digital attacks. In today's connected world, businesses and individuals are increasingly vulnerable to hackers, who aim to steal sensitive information, disrupt operations, or damage reputations."
    },
    need: {
      title: "Why You Need to Be Aware",
      body: <p>Cybersecurity is no longer just an IT issue; it's everyone's responsibility. Whether you're an employee, manager, or executive, being aware of cyber threats helps prevent data breaches, phishing scams, and social engineering attacks. Employees are often the first line of defense, and human error is one of the leading causes of successful attacks.</p>,
      bodyText: "Cybersecurity is no longer just an IT issue; it's everyone's responsibility. Whether you're an employee, manager, or executive, being aware of cyber threats helps prevent data breaches, phishing scams, and social engineering attacks. Employees are often the first line of defense, and human error is one of the leading causes of successful attacks."
    },
    'common-crimes': {
      title: "Common Cyber Crimes Employees Face",
      body: (
        <>
          <p>Employees are vulnerable to several types of cybercrime, including:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Phishing</strong>: Fraudulent emails designed to steal sensitive information such as passwords or financial details.</li>
            <li><strong>Identity Theft</strong>: Stealing someone's personal information to commit fraud.</li>
            <li><strong>Malware</strong>: Malicious software designed to infiltrate and damage systems.</li>
            <li><strong>Social Engineering</strong>: Manipulating individuals into revealing confidential information.</li>
            <li><strong>Data Breaches</strong>: Unauthorized access to sensitive business or personal data.</li>
          </ul>
        </>
      ),
      bodyText: "Employees are vulnerable to several types of cybercrime, including: Phishing: Fraudulent emails designed to steal sensitive information such as passwords or financial details. Identity Theft: Stealing someone's personal information to commit fraud. Malware: Malicious software designed to infiltrate and damage systems. Social Engineering: Manipulating individuals into revealing confidential information. Data Breaches: Unauthorized access to sensitive business or personal data."
    },
    scams: {
      title: "Popular Scams Targeting Employees",
      body: (
        <>
          <p>Some of the most common scams that employees may encounter include:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>CEO Fraud</strong>: Scammers impersonate executives and request urgent wire transfers or sensitive data.</li>
            <li><strong>Invoice Scams</strong>: Fraudulent invoices are sent to businesses, tricking employees into paying for fake goods or services.</li>
            <li><strong>Tech Support Scams</strong>: Scammers pose as IT support, requesting remote access to employee computers.</li>
            <li><strong>Gift Card Scams</strong>: Fraudsters impersonate managers asking employees to purchase gift cards on their behalf.</li>
          </ul>
        </>
      )
    },
    awareness: {
      title: "Employee Awareness & Best Practices",
      body: (
        <>
          <p>To stay protected, employees should follow these best practices:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Think Before You Click</strong>: Always verify links and attachments in emails, especially those from unknown senders.</li>
            <li><strong>Use Strong Passwords</strong>: Create complex, unique passwords for each account, and use a password manager if necessary.</li>
            <li><strong>Enable Two-Factor Authentication (2FA)</strong>: Add an extra layer of security by requiring a second form of authentication.</li>
            <li><strong>Report Suspicious Activity</strong>: Immediately report anything suspicious to your IT department or security team.</li>
            <li><strong>Stay Updated</strong>: Regularly update your software and systems to protect against the latest threats.</li>
          </ul>
        </>
      )
    },
    attacks: {
      title: "Types of Cyber Attacks",
      body: (
        <>
          <p>Here are some of the most common cyber attacks that employees need to be aware of:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Phishing</strong>: Fake emails or websites that trick you into giving personal information.</li>
            <li><strong>Ransomware</strong>: Malware that locks you out of your data and demands a ransom to unlock it.</li>
            <li><strong>DDoS (Distributed Denial of Service)</strong>: Flooding a website with so much traffic that it crashes.</li>
            <li><strong>Man-in-the-Middle (MitM)</strong>: Attacks where hackers intercept and alter communications between two parties.</li>
            <li><strong>Brute Force Attacks</strong>: Attempting to crack passwords by trying multiple combinations.</li>
            <li><strong>Social Engineering</strong>: Tricking people into revealing sensitive information by manipulating emotions or trust.</li>
          </ul>
        </>
      )
    },
    resources: {
      title: "Resources",
      body: (
        <>
          <p>Access additional learning materials, video tutorials, and security news to enhance your understanding:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><a href="#" className="text-blue-600 hover:underline">Cybersecurity Best Practices Guide (PDF)</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Security Awareness Video Library</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Latest Security News</a></li>
          </ul>
        </>
      )
    }
  };
  return contents[id] || { title: "Section Not Found", body: <p>Content not available.</p>, bodyText: "Content not available." };
};

export default Index;
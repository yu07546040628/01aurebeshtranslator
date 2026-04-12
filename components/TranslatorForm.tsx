'use client';

import { useState } from 'react';

const LANGUAGES = [
  { id: 'aurebesh', name: 'Aurebesh', description: '银河共和国标准文字' },
  { id: 'sith', name: 'Sith', description: '西斯文字' },
  { id: 'huttese', name: 'Huttese', description: '赫特语' },
  { id: 'droidspeak', name: 'Droid Speak', description: '机器人语言' },
  { id: 'mandalorian', name: 'Mandalorian', description: '曼达洛语' },
];

export default function TranslatorForm() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('aurebesh');
  const [direction, setDirection] = useState<'toAlien' | 'toEnglish'>('toAlien');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          language: selectedLanguage,
          direction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '翻译失败');
      }

      setOutputText(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '翻译出错');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setDirection(d => d === 'toAlien' ? 'toEnglish' : 'toAlien');
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  const currentLang = LANGUAGES.find(l => l.id === selectedLanguage);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Language Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-yellow-400 mb-2">
          选择语言
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                selectedLanguage === lang.id
                  ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                  : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="font-semibold">{lang.name}</div>
              <div className="text-xs opacity-75 mt-0.5">{lang.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Direction Toggle */}
      <div className="flex items-center justify-center mb-4 gap-4">
        <span className={`text-sm font-medium ${direction === 'toAlien' ? 'text-white' : 'text-gray-500'}`}>
          英语
        </span>
        <button
          onClick={() => setDirection(d => d === 'toAlien' ? 'toEnglish' : 'toAlien')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-yellow-400 text-sm transition-colors"
        >
          <span>{direction === 'toAlien' ? '→' : '←'}</span>
          <span>{currentLang?.name}</span>
        </button>
        <span className={`text-sm font-medium ${direction === 'toEnglish' ? 'text-white' : 'text-gray-500'}`}>
          英语
        </span>
      </div>

      {/* Translation Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-400 mb-1">
            {direction === 'toAlien' ? '英语输入' : `${currentLang?.name} 输入`}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={direction === 'toAlien' ? '输入英语文本...' : `输入 ${currentLang?.name} 文本...`}
            className="w-full h-40 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 resize-none font-mono text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) handleTranslate();
            }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-600">
            {inputText.length} 字符
          </div>
        </div>

        {/* Output */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-400 mb-1">
            {direction === 'toAlien' ? `${currentLang?.name} 输出` : '英语输出'}
          </label>
          <textarea
            value={outputText}
            readOnly
            placeholder="翻译结果将显示在这里..."
            className="w-full h-40 p-3 bg-gray-900 border border-gray-700 rounded-lg text-yellow-300 placeholder-gray-600 resize-none font-mono text-sm"
          />
          {outputText && (
            <button
              onClick={handleCopy}
              className="absolute bottom-2 right-2 text-xs text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded"
            >
              复制
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleTranslate}
          disabled={isLoading || !inputText.trim()}
          className="flex-1 py-3 px-6 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 text-black font-bold rounded-lg transition-colors"
        >
          {isLoading ? '翻译中...' : '翻译 (Ctrl+Enter)'}
        </button>

        {outputText && (
          <button
            onClick={handleSwap}
            className="py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            title="交换输入输出"
          >
            ⇄
          </button>
        )}

        <button
          onClick={handleClear}
          className="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
        >
          清空
        </button>
      </div>

      <p className="text-center text-xs text-gray-600 mt-3">
        提示：按 Ctrl+Enter 快速翻译
      </p>
    </div>
  );
}

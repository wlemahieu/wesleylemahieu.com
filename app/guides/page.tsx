import Link from 'next/link';

const guides = [
  {
    title: 'Take control of your component renders!',
    date: 'Feb 15th, 2023',
  },
];

export default function Guides() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">Guides</h1>
      <div className="container mx-auto max-w-screen-sm">
        {guides.map((guide, key) => (
          <div key={`key-${key}`} className="gradient-box-2 mt-8 mb-8 p-4 border-2 rounded">
            <h3 className="text-xl font-bold text-base4">{guide.title}</h3>
            <div>
              <sub>{guide.date} - By: Wesley LeMahieu</sub>
            </div>
            <div className="mt-4">
              <Link
                href="/guides/take-control-of-your-component-renders"
                className="px-4 py-2 font-semibold text-sm bg-base1 text-white rounded shadow-sm"
              >
                Read Guide
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

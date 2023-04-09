import Link from 'next/link';

const guides = [
  {
    title: 'Take control of your component renders!',
    date: 'Feb 15th, 2023',
  },
];

export default function Guides() {
  return (
    <>
      <div className="header">
        <h1>Guides</h1>
      </div>

      <div className="content">
        <h2 className="content-subhead">Learn concepts</h2>
        <div className="gradient-box-2" style={{ padding: '2rem', margin: '3rem 0rem 0rem 1rem' }}>
          <p>
            Below are some guides I've put together to help anyone trying to better understand certain concepts. Check
            back here every few weeks if you're interested!
          </p>
        </div>
        <div>
          {guides.map((guide, key) => (
            <div key={`key-${key}`} style={{ margin: '2rem 0rem', borderBottom: '1px solid grey' }}>
              <h3 style={{ margin: 0, padding: 0 }}>{guide.title}</h3>
              <sub>{guide.date} - By: Wesley LeMahieu</sub>
              <div className="mt-4">
                <Link
                  href="/guides/take-control-of-your-component-renders"
                  className="px-4 py-2 font-semibold text-sm bg-base1 text-white rounded shadow-sm"
                >
                  Read guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

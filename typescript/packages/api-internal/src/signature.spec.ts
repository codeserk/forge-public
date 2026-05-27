import { SignatureBuilder } from './signature'

describe('SignatureBuilder', () => {
  it('should be deterministic for the same secret + parts + time', async () => {
    const time = '2030-05-24T12:00:00.000Z'
    const a = await new SignatureBuilder('secret').withUrl('/x').withBody({ a: 1 }).build(time)
    const b = await new SignatureBuilder('secret').withUrl('/x').withBody({ a: 1 }).build(time)
    expect(a).toBe(b)
  })

  it('should differ when the secret changes', async () => {
    const time = '2030-05-24T12:00:00.000Z'
    const a = await new SignatureBuilder('secret-a').withUrl('/x').withBody({ a: 1 }).build(time)
    const b = await new SignatureBuilder('secret-b').withUrl('/x').withBody({ a: 1 }).build(time)
    expect(a).not.toBe(b)
  })

  it('should differ when the body changes', async () => {
    const time = '2030-05-24T12:00:00.000Z'
    const a = await new SignatureBuilder('secret').withUrl('/x').withBody({ a: 1 }).build(time)
    const b = await new SignatureBuilder('secret').withUrl('/x').withBody({ a: 2 }).build(time)
    expect(a).not.toBe(b)
  })

  it('should sign a body with non-ASCII characters without throwing', async () => {
    const time = '2030-05-24T12:00:00.000Z'
    const sig = await new SignatureBuilder('secret')
      .withUrl('/x')
      .withBody({ name: 'Oracle consultation → contribution ☕' })
      .build(time)
    expect(typeof sig).toBe('string')
    expect(sig.length).toBeGreaterThan(0)
  })

  it('should accept a custom signHashFn', async () => {
    const fake = jest.fn().mockResolvedValue('faked-signature')
    const builder = new SignatureBuilder('secret', fake)
    const sig = await builder.withUrl('/x').withBody('').build('2030-05-24T12:00:00.000Z')
    expect(sig).toBe('faked-signature')
    expect(fake).toHaveBeenCalledTimes(1)
  })
})

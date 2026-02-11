import { describe, it, expect } from 'vitest'
import { TARGET_GROUPS, challengesByGroup, getChallengesByGroup, challengeTemplates } from './challenges'

describe('challenges - Happy path', () => {
  it('có 4 nhóm đối tượng', () => {
    expect(TARGET_GROUPS).toHaveLength(4)
    expect(TARGET_GROUPS.map(g => g.id)).toContain('tre_em')
    expect(TARGET_GROUPS.map(g => g.id)).toContain('nam')
    expect(TARGET_GROUPS.map(g => g.id)).toContain('nu')
    expect(TARGET_GROUPS.map(g => g.id)).toContain('nguoi_lon')
  })

  it('mỗi nhóm có ít nhất 1 thử thách', () => {
    expect(challengesByGroup.tre_em.length).toBeGreaterThanOrEqual(1)
    expect(challengesByGroup.nam.length).toBeGreaterThanOrEqual(1)
    expect(challengesByGroup.nu.length).toBeGreaterThanOrEqual(1)
    expect(challengesByGroup.nguoi_lon.length).toBeGreaterThanOrEqual(1)
  })

  it('getChallengesByGroup trả về đúng nhóm', () => {
    const treEm = getChallengesByGroup('tre_em')
    expect(treEm).toEqual(challengesByGroup.tre_em)
    expect(treEm[0]).toHaveProperty('text')
    expect(treEm[0]).toHaveProperty('emoji')
  })

  it('challengeTemplates chứa tất cả thử thách', () => {
    const total = Object.values(challengesByGroup).flat().length
    expect(challengeTemplates.length).toBe(total)
  })
})

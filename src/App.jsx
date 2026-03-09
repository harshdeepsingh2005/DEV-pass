import FloatingPassport from './components/FloatingPassport'
import ParticleBackground from './components/ParticleBackground'
import CoverSpread from './spreads/CoverSpread'
import IdentitySpread from './spreads/IdentitySpread'
import SkillsSpread from './spreads/SkillsSpread'
import ProjectsSpread from './spreads/ProjectsSpread'
import JourneySpread from './spreads/JourneySpread'
import ResearchSpread from './spreads/ResearchSpread'
import ExperienceSpread from './spreads/ExperienceSpread'
import ContactSpread from './spreads/ContactSpread'

/**
 * App — Main application.
 *
 * Renders a floating passport book pinned to the viewport.
 * Scrolling drives a GSAP timeline that opens the cover and
 * transitions between 7 page spreads inside the passport.
 *
 * Spread order:
 *   1. Identity   2. Skills   3. Projects   4. Journey
 *   5. Research   6. Experience   7. Exit Visa (Contact)
 */
function App() {
  const spreads = [
    <IdentitySpread key="identity" />,
    <SkillsSpread key="skills" />,
    <ProjectsSpread key="projects" />,
    <JourneySpread key="journey" />,
    <ResearchSpread key="research" />,
    <ExperienceSpread key="experience" />,
    <ContactSpread key="contact" />,
  ]

  return (
    <>
      <ParticleBackground />
      <FloatingPassport cover={<CoverSpread />} spreads={spreads} />
    </>
  )
}

export default App

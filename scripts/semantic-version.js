#!/usr/bin/env node

import { execSync } from 'child_process';

/**
 * Semantic Versioning Script
 * Erstellt automatisch Tags basierend auf Conventional Commits
 */

// Conventional Commits Pattern
const CONVENTIONAL_COMMIT_PATTERN = /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\(.+\))?: (.+)$/;

// Version bump types
const VERSION_BUMP = {
  'feat': 'minor',      // New feature
  'fix': 'patch',       // Bug fix
  'perf': 'patch',      // Performance improvement
  'revert': 'patch',    // Revert changes
  'docs': 'prerelease', // Documentation changes
  'style': 'prerelease', // Code style changes
  'refactor': 'prerelease', // Code refactoring
  'test': 'prerelease', // Test changes
  'chore': 'prerelease', // Maintenance tasks
  'ci': 'prerelease',   // CI changes
  'build': 'prerelease' // Build changes
};

function getCurrentVersion() {
  try {
    const result = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' });
    return result.trim();
  } catch {
    // No tags exist yet, start with 0.0.0
    return '0.0.0';
  }
}

function getLatestCommitMessage() {
  try {
    const result = execSync('git log -1 --pretty=%B', { encoding: 'utf8' });
    return result.trim();
  } catch (error) {
    console.error('Error getting commit message:', error.message);
     
    process.exit(1);
  }
}

function parseVersion(version) {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([\w.-]+))?(?:\+([\w.-]+))?$/);
  if (!match) {
    throw new Error(`Invalid version format: ${version}`);
  }
  
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] || null,
    build: match[5] || null
  };
}

function incrementVersion(currentVersion, bumpType) {
  const version = parseVersion(currentVersion);
  
  switch (bumpType) {
    case 'major':
      version.major += 1;
      version.minor = 0;
      version.patch = 0;
      version.prerelease = null;
      break;
    case 'minor':
      version.minor += 1;
      version.patch = 0;
      version.prerelease = null;
      break;
    case 'patch':
      version.patch += 1;
      version.prerelease = null;
      break;
    case 'prerelease':
      if (version.prerelease) {
        // Increment prerelease version
        const prereleaseMatch = version.prerelease.match(/^(.+?)(\d+)$/);
        if (prereleaseMatch) {
          const [, prefix, num] = prereleaseMatch;
          version.prerelease = `${prefix}${parseInt(num, 10) + 1}`;
        } else {
          version.prerelease = `${version.prerelease}.1`;
        }
      } else {
        version.prerelease = 'alpha.1';
      }
      break;
    default:
      throw new Error(`Unknown bump type: ${bumpType}`);
  }
  
  let newVersion = `${version.major}.${version.minor}.${version.patch}`;
  if (version.prerelease) {
    newVersion += `-${version.prerelease}`;
  }
  if (version.build) {
    newVersion += `+${version.build}`;
  }
  
  return newVersion;
}

function determineBumpType(commitMessage) {
  const match = commitMessage.match(CONVENTIONAL_COMMIT_PATTERN);
  
  if (!match) {
    console.log('Commit message does not follow conventional commits format, skipping version bump');
    return null;
  }
  
  const [, type, , description] = match;
  
  // Check for breaking changes
  if (description.includes('BREAKING CHANGE') || description.includes('!:')) {
    return 'major';
  }
  
  return VERSION_BUMP[type] || 'prerelease';
}

function createTag(version) {
  const tagName = `v${version}`;
  
  try {
    // Check if tag already exists
    execSync(`git rev-parse --verify ${tagName}`, { stdio: 'ignore' });
    console.log(`Tag ${tagName} already exists, skipping`);
    return false;
  } catch {
    // Tag doesn't exist, create it
    try {
      execSync(`git tag -a ${tagName} -m "Release ${tagName}"`, { stdio: 'inherit' });
      console.log(`Created tag: ${tagName}`);
      return true;
    } catch (tagError) {
      console.error(`Error creating tag ${tagName}:`, tagError.message);
      return false;
    }
  }
}

function main() {
  console.log('🚀 Semantic Versioning Script');
  
  const commitMessage = getLatestCommitMessage();
  console.log(`📝 Latest commit: ${commitMessage}`);
  
  const bumpType = determineBumpType(commitMessage);
  if (!bumpType) {
    console.log('⏭️  No version bump needed');
    return;
  }
  
  const currentVersion = getCurrentVersion();
  console.log(`📦 Current version: ${currentVersion}`);
  
  const newVersion = incrementVersion(currentVersion, bumpType);
  console.log(`🆕 New version: ${newVersion} (${bumpType} bump)`);
  
  const tagCreated = createTag(newVersion);
  if (tagCreated) {
    console.log(`✅ Successfully created tag v${newVersion}`);
  } else {
    console.log(`ℹ️  Tag v${newVersion} was not created`);
  }
}

// Run the script
 
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  getCurrentVersion,
  getLatestCommitMessage,
  parseVersion,
  incrementVersion,
  determineBumpType,
  createTag
};

